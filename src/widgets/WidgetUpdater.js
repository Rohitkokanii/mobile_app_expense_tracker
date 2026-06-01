import {updateWidget} from 'react-native-android-widget';

import {ExpenseStorage} from '../store/local-store/ExpenseStorage';

import {AnalyticsEngine} from '../screens/app/utils/AnalyticsEngine';

export const refreshWidget = async () => {
  const expenses = await ExpenseStorage.getExpenses();

  const total = AnalyticsEngine.total(expenses);

  const biggest = AnalyticsEngine.biggestCategory(expenses);

  const types = AnalyticsEngine.typeTotals(expenses);

  const insights = AnalyticsEngine.insights(expenses);

  await updateWidget({
    total,

    highest: biggest.category,

    investment: types.growth,

    insight: insights[0] || 'Healthy spending',
  });
};
