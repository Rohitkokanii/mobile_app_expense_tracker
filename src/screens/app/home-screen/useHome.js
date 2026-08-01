import {useState, useEffect, useMemo, useCallback} from 'react';
import {Alert} from 'react-native';
import {getAuth} from '@react-native-firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from '@react-native-firebase/firestore';

import {ExpenseStorage} from '../../../store/local-store/ExpenseStorage';
import {AnalyticsEngine} from '../utils/AnalyticsEngine';
import {
  detectCategory,
  getExpenseType,
  learnCategory,
} from '../utils/SmartClassifier';
import {refreshWidget} from '../../../widgets/WidgetUpdater';

const PAGE_SIZE = 10;

export const useHome = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [allExpensesForAnalytics, setAllExpensesForAnalytics] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);

  const [teachModal, setTeachModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser?.uid;

  // 1. Check and Migrate local expenses to Firestore
  const checkAndMigrateLocalData = useCallback(async () => {
    if (!userId) return;

    try {
      const localData = await ExpenseStorage.getExpenses();
      if (localData && localData.length > 0) {
        Alert.alert(
          'Sync Local Data',
          'Found offline expense data stored on your device. Would you like to upload it to your account?',
          [
            {
              text: 'Keep Offline Only',
              style: 'cancel',
              onPress: async () => {
                await ExpenseStorage.saveExpenses([]);
              },
            },
            {
              text: 'Sync to Cloud',
              onPress: async () => {
                const userExpensesRef = collection(
                  db,
                  'users',
                  userId,
                  'expenses',
                );
                for (const item of localData) {
                  await addDoc(userExpensesRef, {
                    title: item.title,
                    amount: Number(item.amount),
                    category: item.category,
                    type: item.type,
                    date: item.date || new Date().toISOString(),
                    createdAt: new Date().toISOString(),
                  });
                }
                await ExpenseStorage.saveExpenses([]); // Clear local storage after successful sync
                fetchInitialExpenses();
                fetchAllExpensesForAnalytics();
              },
            },
          ],
        );
      }
    } catch (err) {
      console.error('Data Migration Error:', err);
    }
  }, [userId]);

  // 2. Fetch Initial Page
  const fetchInitialExpenses = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const expensesRef = collection(db, 'users', userId, 'expenses');
      const q = query(expensesRef, orderBy('date', 'desc'), limit(PAGE_SIZE));
      const snapshot = await getDocs(q);

      const items = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setExpenses(items);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
    } catch (err) {
      console.error('Fetch Expenses Error:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 3. Fetch Next Page (Pagination)
  const fetchMoreExpenses = async () => {
    if (!userId || loadingMore || !hasMore || !lastDoc) return;
    setLoadingMore(true);

    try {
      const expensesRef = collection(db, 'users', userId, 'expenses');
      const q = query(
        expensesRef,
        orderBy('date', 'desc'),
        startAfter(lastDoc),
        limit(PAGE_SIZE),
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const newItems = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setExpenses(prev => [...prev, ...newItems]);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Fetch More Error:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  // 4. Fetch All Expenses for Dashboard Metrics
  const fetchAllExpensesForAnalytics = useCallback(async () => {
    if (!userId) return;

    try {
      const expensesRef = collection(db, 'users', userId, 'expenses');
      const snapshot = await getDocs(expensesRef);
      const items = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setAllExpensesForAnalytics(items);
    } catch (err) {
      console.error('Fetch Analytics Data Error:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchInitialExpenses();
    fetchAllExpensesForAnalytics();
    checkAndMigrateLocalData();
  }, [
    fetchInitialExpenses,
    fetchAllExpensesForAnalytics,
    checkAndMigrateLocalData,
  ]);

  // 5. Add Expense
  const addExpense = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Validation', 'Please fill all fields');
      return;
    }

    if (!userId) return;

    try {
      const category = await detectCategory(title);
      const type = getExpenseType(category);
      const newExpense = {
        title: title.trim(),
        amount: Number(amount),
        category,
        type,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const userExpensesRef = collection(db, 'users', userId, 'expenses');
      const docRef = await addDoc(userExpensesRef, newExpense);

      const addedItem = {id: docRef.id, ...newExpense};

      setExpenses(prev => [addedItem, ...prev]);
      setAllExpensesForAnalytics(prev => [addedItem, ...prev]);

      await refreshWidget();
      setTitle('');
      setAmount('');
    } catch (err) {
      console.error('Add Expense Error:', err);
      Alert.alert('Error', 'Could not add expense. Please try again.');
    }
  };

  // 6. Delete Expense
  const deleteExpense = id => {
    Alert.alert('Delete Expense', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const docRef = doc(db, 'users', userId, 'expenses', id);
            await deleteDoc(docRef);

            setExpenses(prev => prev.filter(x => x.id !== id));
            setAllExpensesForAnalytics(prev => prev.filter(x => x.id !== id));

            await refreshWidget();
          } catch (err) {
            console.error('Delete Error:', err);
          }
        },
      },
    ]);
  };

  // 7. Teach AI Logic
  const teachAI = async category => {
    if (!selectedExpense || !userId) return;

    try {
      await learnCategory(selectedExpense.title, category);
      const updatedType = getExpenseType(category);

      const docRef = doc(db, 'users', userId, 'expenses', selectedExpense.id);
      await updateDoc(docRef, {
        category,
        type: updatedType,
      });

      const updateList = list =>
        list.map(item =>
          item.id === selectedExpense.id
            ? {...item, category, type: updatedType}
            : item,
        );

      setExpenses(prev => updateList(prev));
      setAllExpensesForAnalytics(prev => updateList(prev));

      setTeachModal(false);
      setSelectedExpense(null);
    } catch (err) {
      console.error('Teach AI Error:', err);
    }
  };

  // Calculated Metrics using complete dataset
  const total = useMemo(
    () => AnalyticsEngine.total(allExpensesForAnalytics),
    [allExpensesForAnalytics],
  );
  const biggest = useMemo(
    () => AnalyticsEngine.biggestCategory(allExpensesForAnalytics),
    [allExpensesForAnalytics],
  );
  const insights = useMemo(
    () => AnalyticsEngine.insights(allExpensesForAnalytics),
    [allExpensesForAnalytics],
  );
  const types = useMemo(
    () => AnalyticsEngine.typeTotals(allExpensesForAnalytics),
    [allExpensesForAnalytics],
  );

  return {
    title,
    setTitle,
    amount,
    setAmount,
    expenses,
    loading,
    loadingMore,
    teachModal,
    setTeachModal,
    setSelectedExpense,
    addExpense,
    deleteExpense,
    teachAI,
    fetchMoreExpenses,
    total,
    biggest,
    insights,
    types,
  };
};
