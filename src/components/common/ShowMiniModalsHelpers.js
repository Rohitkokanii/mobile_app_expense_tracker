import {Alert, Platform} from 'react-native';
import {showMessage} from 'react-native-flash-message';
// 'danger' success
export async function showMiniMessage({message, type}) {
  try {
    if (Platform.OS === 'android') {
      showMessage({
        message: message,
        type: type, // 'success', 'danger', 'info', etc.
        titleStyle: {
          textAlign: 'center',
        },
        floating: true,
        icon: type === 'danger' ? 'danger' : 'success',
        duration: 3000,
      });
    } else {
      Alert.alert(
        type === 'danger' ? 'Error' : 'Info',
        message,
        [{text: 'OK', style: 'default'}],
        {cancelable: true},
      );
    }
  } catch (error) {
    console.error('Error showing mini message:', error);
  }
}
