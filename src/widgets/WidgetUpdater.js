import React from 'react';
import {requestWidgetUpdate} from 'react-native-android-widget';

import {ExpenseStorage} from '../store/local-store/ExpenseStorage';
import {AnalyticsEngine} from '../screens/app/utils/AnalyticsEngine';
import MyWidget from './MyWidget';

export const refreshWidget = async () => {
  try {
    const expenses = await ExpenseStorage.getExpenses();

    const total = AnalyticsEngine.total(expenses);
    const biggest = AnalyticsEngine.biggestCategory(expenses);
    const types = AnalyticsEngine.typeTotals(expenses);
    const insights = AnalyticsEngine.insights(expenses);

    await requestWidgetUpdate({
      widgetClassName: 'com.reactnativeandroidwidget.RNWidgetReceiver',
      renderWidget: () => (
        <MyWidget
          total={total}
          highest={biggest.category}
          investment={types.growth}
          insight={insights[0] || 'Healthy spending'}
        />
      ),
      widgetName: 'TrackIt',
    });
  } catch (error) {
    console.warn('Widget refresh silently skipped:', error);
  }
};
