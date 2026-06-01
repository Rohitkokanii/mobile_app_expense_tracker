import {useRef} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
  Text,
} from 'react-native';

import {BlurView} from '@react-native-community/blur';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
import layout from '../../theme/layout';
import {Texts} from '../common/Texts';
import SizedView from '../common/SizedView';
import TextUnboundedButton from '../buttons/TextUnboundedButton';
import {useMyContext} from '../../store/context-store/myContextProvider';

const ConfirmModal = props => {
  const {visible, onRequestClose, onYes} = props;
  const ViewRef = useRef();
  const {CurrentLangName} = useMyContext();

  const message = props.message || localization.AreYouSure[CurrentLangName];

  const yesText = props.yesText || localization.Yes[CurrentLangName];

  const noText = props.noText || localization.No[CurrentLangName];
  return (
    <>
      <Modal
        statusBarTranslucent
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onRequestClose}>
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View ref={ViewRef} style={styles.modalContainer}>
            <Pressable style={styles.container}>
              <Texts.pt16 style={{textAlign: 'center'}}>{message}</Texts.pt16>

              <SizedView height={27} />

              <View style={[layout.row, {paddingHorizontal: rwp(15)}]}>
                <TextUnboundedButton
                  Container={{
                    backgroundColor: '#808080',
                    flex: 1,
                    borderRadius: 4,
                    width: rwp(170),
                  }}
                  TextStyle={{color: '#FFFFFF'}}
                  onPress={onRequestClose}
                  Title={noText}
                />

                <SizedView width={6} />

                <TextUnboundedButton
                  TextStyle={{color: '#FFFFFF'}}
                  Container={{
                    backgroundColor: '#005AA1',
                    flex: 1,
                    borderRadius: 4,
                    width: rwp(170),
                  }}
                  onPress={onYes}
                  Title={yesText}
                />
              </View>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>

        {ViewRef && visible ? (
          <BlurView
            style={[StyleSheet.absoluteFill, {zIndex: -1}]}
            viewRef={ViewRef}
            blurType="light"
            blurAmount={5}
            blurRadius={5}
          />
        ) : null}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: rwp(359),
    backgroundColor: '#FFFFFF',
    paddingRight: rwp(6),
    paddingLeft: rwp(9),
    elevation: 9,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: rhp(151),
  },
});

export default ConfirmModal;
