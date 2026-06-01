import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSE_KEY = 'EXPENSES_DB';
const MEMORY_KEY = 'CATEGORY_MEMORY';

export const ExpenseStorage = {
  async getExpenses() {
    try {
      const data = await AsyncStorage.getItem(EXPENSE_KEY);

      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async saveExpenses(expenses) {
    await AsyncStorage.setItem(EXPENSE_KEY, JSON.stringify(expenses));
  },

  async clearExpenses() {
    await AsyncStorage.removeItem(EXPENSE_KEY);
  },

  async getMemory() {
    try {
      const data = await AsyncStorage.getItem(MEMORY_KEY);

      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  async saveMemory(memory) {
    await AsyncStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
  },
};
