/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {registerWidgetTaskHandler} from 'react-native-android-widget';

import App from './App';
import {name as appName} from './app.json';

// Import widget and storage modules
import MyWidget from './src/widgets/MyWidget';
import {ExpenseStorage} from './src/store/local-store/ExpenseStorage';
import {AnalyticsEngine} from './src/screens/app/utils/AnalyticsEngine';

// Register background widget task for Android
registerWidgetTaskHandler(async ({renderWidget}) => {
  try {
    // 1. Fetch expenses from local storage in background
    const expenses = (await ExpenseStorage.getExpenses()) || [];

    // 2. Compute analytics data
    const total = AnalyticsEngine.total(expenses);
    const biggest = AnalyticsEngine.biggestCategory(expenses);
    const types = AnalyticsEngine.typeTotals(expenses);
    const insights = AnalyticsEngine.insights(expenses);

    // 3. Render the React Component layout onto the Native Android Widget
    renderWidget(
      <MyWidget
        total={total}
        highest={biggest.category}
        investment={types.growth}
        insight={insights[0] || 'Healthy spending'}
      />,
    );
  } catch (error) {
    console.error('Error rendering widget task:', error);
  }
});

AppRegistry.registerComponent(appName, () => App);
