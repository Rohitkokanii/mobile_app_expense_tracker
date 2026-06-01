import {ExpenseStorage} from '../../../store/local-store/ExpenseStorage';

const keywordRules = {
  Food: ['pizza', 'burger', 'food', 'zomato', 'swiggy', 'restaurant', 'cafe'],

  Travel: ['uber', 'ola', 'petrol', 'diesel', 'train', 'flight', 'travel'],

  Shopping: ['amazon', 'flipkart', 'shopping', 'shirt', 'shoes', 'mobile'],

  Bills: ['bill', 'electricity', 'wifi', 'rent', 'recharge'],

  Investment: ['sip', 'stock', 'mutual', 'investment', 'saving', 'zerodha'],

  Entertainment: ['movie', 'netflix', 'spotify', 'game', 'party'],
};

export async function detectCategory(title) {
  const text = title.toLowerCase();

  const memory = await ExpenseStorage.getMemory();

  for (const key in memory) {
    if (text.includes(key)) {
      return memory[key];
    }
  }

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
  const memory = await ExpenseStorage.getMemory();

  memory[title.toLowerCase()] = category;

  await ExpenseStorage.saveMemory(memory);
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
