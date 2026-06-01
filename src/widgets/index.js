import {registerWidgetTaskHandler} from 'react-native-android-widget';

registerWidgetTaskHandler(
  'ExpenseWidget',

  async () => {
    console.log('WIDGET EXECUTED 🚀');

    return {
      render() {
        return <Text>TEST WIDGET</Text>;
      },
    };
  },
);
