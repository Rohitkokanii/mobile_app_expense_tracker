import React, {useEffect, useMemo, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Texts} from '../../../components/common/Texts';
import DefaultWrap from '../../../components/wrappers/DefaultWrap';
import layout from '../../../theme/layout';

import SizedView from '../../../components/common/SizedView';
import {ExpenseStorage} from '../../../store/local-store/ExpenseStorage';
import {rwp} from '../../../utils/helpers/responsivePixelHelper';
import {AnalyticsEngine} from '../utils/AnalyticsEngine';
import {
  detectCategory,
  getExpenseType,
  learnCategory,
} from '../utils/SmartClassifier';
import {refreshWidget} from '../../../widgets/WidgetUpdater';

const categories = [
  'Food',
  'Travel',
  'Shopping',
  'Bills',
  'Investment',
  'Entertainment',
  'Irrelevant',
];

const HomeScreen = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teachModal, setTeachModal] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const data = await ExpenseStorage.getExpenses();

    setExpenses(data);
    setLoading(false);
  };

  const saveExpenses = async data => {
    setExpenses(data);

    await ExpenseStorage.saveExpenses(data);
  };

  const addExpense = async () => {
    if (!title.trim() || !amount.trim()) {
      Alert.alert('Validation', 'Please fill all fields');

      return;
    }

    const category = await detectCategory(title);

    const type = getExpenseType(category);

    const newExpense = {
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category,
      type,
      date: new Date().toISOString(),
    };

    const updated = [newExpense, ...expenses];

    await saveExpenses(updated);
    await refreshWidget();

    setTitle('');
    setAmount('');
  };

  const deleteExpense = id => {
    Alert.alert('Delete Expense', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = expenses.filter(x => x.id !== id);

          await saveExpenses(updated);
          await refreshWidget();
        },
      },
    ]);
  };

  const teachAI = async category => {
    if (!selectedExpense) return;

    await learnCategory(selectedExpense.title, category);

    const updated = expenses.map(item => {
      if (item.id === selectedExpense.id) {
        return {
          ...item,
          category,
          type: getExpenseType(category),
        };
      }

      return item;
    });

    await saveExpenses(updated);

    setTeachModal(false);
    setSelectedExpense(null);
  };

  const total = useMemo(() => AnalyticsEngine.total(expenses), [expenses]);

  const biggest = useMemo(
    () => AnalyticsEngine.biggestCategory(expenses),
    [expenses],
  );

  const insights = useMemo(
    () => AnalyticsEngine.insights(expenses),
    [expenses],
  );

  const types = useMemo(() => AnalyticsEngine.typeTotals(expenses), [expenses]);

  const renderExpense = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.expenseCard}
      onLongPress={() => {
        setSelectedExpense(item);
        setTeachModal(true);
      }}>
      <View style={{flex: 1}}>
        <Texts.pt18 style={styles.title}>{item.title}</Texts.pt18>

        <Texts.pt13 style={styles.category}>
          {item.category} • {item.type}
        </Texts.pt13>

        <Texts.pt11 style={styles.date}>
          {new Date(item.date).toLocaleDateString()}
        </Texts.pt11>
      </View>

      <View
        style={{
          alignItems: 'flex-end',
        }}>
        <Texts.pt20 style={styles.amount}>₹{item.amount}</Texts.pt20>

        <TouchableOpacity onPress={() => deleteExpense(item.id)}>
          <Texts.pt13 style={styles.delete}>Delete</Texts.pt13>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <DefaultWrap MainContainer={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SizedView height={50} />
        <LinearGradient
          colors={['#111827', '#1E293B', '#0F172A']}
          style={styles.dashboard}>
          <Texts.pt18 style={styles.smallTitle}>Total Expense</Texts.pt18>

          <Texts.pt38 style={styles.total}>₹{total}</Texts.pt38>

          <View style={layout.rowBetween}>
            <View>
              <Texts.pt13 style={styles.metricTitle}>Top Category</Texts.pt13>

              <Texts.pt16 style={styles.metricValue}>
                {biggest.category}
              </Texts.pt16>
            </View>

            <View>
              <Texts.pt13 style={styles.metricTitle}>Investment</Texts.pt13>

              <Texts.pt16 style={styles.metricValue}>
                ₹{types.growth}
              </Texts.pt16>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.inputCard}>
          <Texts.pt14 style={styles.label}>Expense Title</Texts.pt14>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Amazon, Uber, Pizza..."
            placeholderTextColor="#777"
            style={styles.input}
          />

          <Texts.pt14 style={styles.label}>Amount</Texts.pt14>

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#777"
            style={styles.input}
          />

          <TouchableOpacity style={styles.addButton} onPress={addExpense}>
            <Texts.pt18 style={styles.addText}>Add Expense</Texts.pt18>
          </TouchableOpacity>
        </View>
        <View style={styles.analyticsBox}>
          <Texts.pt18 style={styles.sectionTitle}>AI Insights</Texts.pt18>

          {insights.map((item, index) => (
            <Texts.pt13 key={index} style={styles.insight}>
              • {item}
            </Texts.pt13>
          ))}
        </View>

        <Texts.pt20 style={styles.historyTitle}>Recent Expenses</Texts.pt20>

        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          renderItem={renderExpense}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Texts.pt16 style={styles.empty}>No Expenses Added</Texts.pt16>
          }
        />

        <SizedView height={100} />
      </ScrollView>

      <Modal visible={teachModal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Texts.pt22 style={styles.modalTitle}>Teach AI</Texts.pt22>

            <Texts.pt14 style={styles.modalText}>
              Select correct category
            </Texts.pt14>

            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={styles.categoryBtn}
                onPress={() => teachAI(category)}>
                <Texts.pt16 style={styles.categoryText}>{category}</Texts.pt16>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={() => setTeachModal(false)}>
              <Texts.pt15 style={styles.cancel}>Close</Texts.pt15>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DefaultWrap>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: rwp(10),
  },

  dashboard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
  },

  smallTitle: {
    color: '#94A3B8',
  },

  total: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginVertical: 10,
  },

  metricTitle: {
    color: '#64748B',
  },

  metricValue: {
    color: '#F8FAFC',
    fontWeight: '700',
  },

  inputCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
  },

  label: {
    color: '#CBD5E1',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
  },

  addButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },

  addText: {
    color: '#fff',
    fontWeight: '800',
  },

  analyticsBox: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 20,
  },

  sectionTitle: {
    color: '#fff',
    fontWeight: '800',
    marginBottom: 10,
  },

  insight: {
    color: '#CBD5E1',
    marginBottom: 8,
  },

  historyTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 14,
  },

  expenseCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#F8FAFC',
    fontWeight: '700',
  },

  category: {
    color: '#8B5CF6',
    marginTop: 6,
  },

  date: {
    color: '#64748B',
    marginTop: 6,
  },

  amount: {
    color: '#34D399',
    fontWeight: '800',
  },

  delete: {
    color: '#EF4444',
    marginTop: 8,
    fontWeight: '700',
  },

  empty: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 40,
  },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: '#111827',
    borderRadius: 26,
    padding: 22,
  },

  modalTitle: {
    color: '#fff',
    fontWeight: '800',
    marginBottom: 10,
  },

  modalText: {
    color: '#CBD5E1',
    marginBottom: 18,
  },

  categoryBtn: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  categoryText: {
    color: '#F8FAFC',
    fontWeight: '700',
  },

  cancel: {
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '700',
  },
});
