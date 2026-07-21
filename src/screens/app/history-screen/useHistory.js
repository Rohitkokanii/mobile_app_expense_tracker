import {useState, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const useHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);

    const currentUser = auth().currentUser;

    if (!currentUser) {
      console.warn('No user logged in, skipping expense fetch.');
      setExpenses([]);
      setLoading(false);
      return;
    }

    try {
      // 1. Target the specific user's expenses subcollection
      const snapshot = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('expenses')
        .get();

      // 2. Map Firestore docs to plain JavaScript objects
      let data = snapshot.docs.map(doc => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          // Normalize timestamp if createdAt exists
          createdAt: docData.createdAt?.toDate
            ? docData.createdAt.toDate()
            : docData.createdAt,
        };
      });

      // 3. Sort client-side safely so missing indices/timestamps won't break the fetch
      data.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });

      console.log(
        `Successfully fetched ${data.length} expenses for user: ${currentUser.uid}`,
      );
      setExpenses(data);
    } catch (err) {
      console.error('Error fetching expenses from Firebase:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
  };
};
