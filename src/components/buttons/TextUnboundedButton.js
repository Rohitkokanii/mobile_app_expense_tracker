import {StyleSheet, TouchableOpacity} from 'react-native';
import {rhp} from '../../utils/helpers/responsivePixelHelper';
import {Texts} from '../common/Texts';

const TextUnboundedButton = ({onPress, Title, Container, TextStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.Container, Container]}>
      <Texts.pt16 children={Title} style={[styles.textStyle, TextStyle]} />
    </TouchableOpacity>
  );
};

export default TextUnboundedButton;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: rhp(38),
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
  },
  textStyle: {
    fontWeight: 600,
  },
});
