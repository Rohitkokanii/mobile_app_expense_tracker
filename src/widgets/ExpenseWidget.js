import React from 'react';

import {WidgetTaskHandler, Widget, Text} from 'react-native-android-widget';

const ExpenseWidget = new WidgetTaskHandler(async props => {
  return (
    <Widget>
      <Text>Widget Working 🚀</Text>
    </Widget>
  );
});

export default ExpenseWidget;
