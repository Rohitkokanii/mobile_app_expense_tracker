import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ExpenseStorage} from '../../../store/local-store/ExpenseStorage';

const keywordRules = {
  Food: ['pizza', 'burger', 'food', 'zomato', 'swiggy', 'restaurant', 'cafe'],
  Travel: ['uber', 'ola', 'petrol', 'diesel', 'train', 'flight', 'travel'],
  Shopping: ['amazon', 'flipkart', 'shopping', 'shirt', 'shoes', 'mobile'],
  Bills: ['bill', 'electricity', 'wifi', 'rent', 'recharge'],
  Investment: ['sip', 'stock', 'mutual', 'investment', 'saving', 'zerodha'],
  Entertainment: ['movie', 'netflix', 'spotify', 'game', 'party'],
};

// Helper: Get learned memory rules from Firestore (or Local Storage fallback)
const getMemory = async () => {
  const currentUser = auth().currentUser;

  if (currentUser) {
    try {
      const docSnap = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('settings')
        .doc('classifier')
        .get();

      if (docSnap.exists) {
        return docSnap.data().memory || {};
      }
    } catch (err) {
      console.warn(
        'Failed to fetch AI memory from Firebase, falling back to local storage:',
        err,
      );
    }
  }

  // Local fallback if unauthenticated or offline
  return await ExpenseStorage.getMemory();
};

export async function detectCategory(title) {
  const text = title.toLowerCase();

  // 1. Check learned memory (Cloud/Local)
  const memory = await getMemory();

  for (const key in memory) {
    if (text.includes(key)) {
      return memory[key];
    }
  }

  // 2. Check rule-based keywords
  for (const category in keywordRules) {
    for (const word of keywordRules[category]) {
      if (text.includes(word)) {
        return category;
      }
    }
  }

  return 'Irrelevant';
}

export async function learnCategory(title, category) {
  const currentUser = auth().currentUser;
  const key = title.toLowerCase();

  // 1. Always update local storage
  const localMemory = await ExpenseStorage.getMemory();
  localMemory[key] = category;
  await ExpenseStorage.saveMemory(localMemory);

  // 2. Sync learned rule to Firestore user profile
  if (currentUser) {
    try {
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('settings')
        .doc('classifier')
        .set(
          {
            memory: {
              [key]: category,
            },
          },
          {merge: true},
        );
    } catch (err) {
      console.error('Failed to save AI memory to Firestore:', err);
    }
  }
}

export function getExpenseType(category) {
  if (category === 'Investment') {
    return 'Growth';
  }

  if (['Food', 'Bills', 'Travel'].includes(category)) {
    return 'Necessary';
  }

  return 'Irrelevant';
}
