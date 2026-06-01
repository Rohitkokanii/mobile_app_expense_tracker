import {useRef} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Icons from '../../components/common/Icons';
import {BlurView} from '@react-native-community/blur';
import {CameraImagePicker, ImagePicker} from './imagePickerHelper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import localization from '../../store/localization/localization';
import {useMyContext} from '../../store/context-store/myContextProvider';
const ImagePickerModal = ({
  visible,
  onRequestClose,
  NumberOfImages = 0,
  handleInputChange,
  FormObjName,
  SelecedImages,
  Append,
  index,
}) => {
  const ViewRef = useRef();
  const {CurrentLangName} = useMyContext();
  const onCamera = async () => {
    try {
      onRequestClose();
      const Res = await CameraImagePicker(NumberOfImages);
      console.warn('Images Picked From Camera', Res);
      if (Res) {
        if (Append) {
          if (index !== undefined && index !== null) {
            handleInputChange(index, FormObjName, [...SelecedImages, ...Res]);
          } else {
            handleInputChange(FormObjName, [...SelecedImages, ...Res]);
          }
        } else {
          if (index !== undefined && index !== null) {
            handleInputChange(index, FormObjName, Res);
          } else {
            handleInputChange(FormObjName, Res);
          }
        }
      }
    } catch (error) {
      console.log('ERROR in onCamera');
    }
  };
  const onGallery = async () => {
    try {
      onRequestClose();
      const Res = await ImagePicker(NumberOfImages);
      console.warn('Images Picked From Gallery', Res);

      if (Res) {
        if (Append) {
          if (index !== undefined && index !== null) {
            handleInputChange(index, FormObjName, [...SelecedImages, ...Res]);
          } else {
            handleInputChange(FormObjName, [...SelecedImages, ...Res]);
          }
        } else {
          if (index !== undefined && index !== null) {
            handleInputChange(index, FormObjName, Res);
          } else {
            handleInputChange(FormObjName, Res);
          }
        }
      }
    } catch (error) {
      console.log('ERROR in onGallery');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View ref={ViewRef} style={styles.modalContainer}>
          <View style={styles.MainContainer}>
            <View style={styles.TitleView}>
              <Text style={styles.TitleText}>
                {localization.AddPhoto[CurrentLangName]}
              </Text>
              <TouchableOpacity
                onPress={onRequestClose}
                style={{bottom: responsiveHeight(0.8)}}>
                <Icons.Entypo
                  name={'cross'}
                  color={'#000000'}
                  size={responsiveWidth(5)}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onCamera} style={styles.OptionsView1}>
              <Text style={styles.OptionsText}>
                {localization.TakePhoto[CurrentLangName]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGallery} style={styles.OptionsView2}>
              <Text style={styles.OptionsText}>
                {localization.ChooseFromGallery[CurrentLangName]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {ViewRef && visible ? (
        <BlurView
          style={styles.absolute}
          viewRef={ViewRef}
          blurType="light"
          blurAmount={5}
          blurRadius={5}
        />
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    height: responsiveHeight(20),
    width: responsiveWidth(80),
    backgroundColor: 'white',
    borderRadius: 7,
    shadowColor: 'black',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  TitleView: {
    height: responsiveHeight(8),
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(7),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#009B00',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  OptionsView1: {
    height: responsiveHeight(6),
    borderBottomWidth: 1,
    borderColor: '#707070',
    justifyContent: 'center',
  },
  OptionsView2: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: responsiveWidth(3),
  },
  TitleText: {
    color: '#009B00',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '700',
  },
  OptionsText: {
    color: '#000000',
    fontSize: responsiveFontSize(1.8),
    paddingLeft: responsiveWidth(5),
    fontWeight: '500',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
  },
});

export default ImagePickerModal;
