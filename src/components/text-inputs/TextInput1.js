import {
  Button,
  Image,
  InputAccessoryView,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {memo, useState} from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Texts} from '../common/Texts';
import Icons from '../common/Icons';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
import {IMAGES} from '../../utils/constant/imageConstant';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TextInput1 = ({
  value,
  handleInputChange,
  textArea = false,
  placeholder,
  error,
  maxLength,
  onSubmitEditing,
  inputRef,
  keyboardType,
  formKey,
  editable,
  style,
  textInputStyle,
  multiline,
  icon,
  onImageChange,
  title,
  onCalendarPress,
  onDropdownPress,
  onRightArrowPress,
  onSearchPress,
  containerStyle,
  // minDate,
  // maxDate,
  onCrossPress,
  sanitizationFunction,
  secureTextEntry,
  titleTextStyle,
  onGetOtpPress,
  onPress,
  isOtpVerified,
  useDone = true,
  icon1,
}) => {
  const inputAccessoryViewID = 'doneButton';

  const [eye, setEye] = useState(true);

  return (
    <>
      <Pressable
        onPress={onPress || Keyboard.dismiss}
        style={[{width: '100%'}, containerStyle]}>
        {title ? (
          <Text style={[titleTextStyle, styles.titleTextStyle]}>{title}</Text>
        ) : null}
        <View
          style={[
            TextInputStyles.mainView,
            {
              alignItems: textArea ? 'flex-start' : 'center',
              height: rhp(textArea ? 90 : 40),
              borderColor: error ? 'red' : '#D3D3D3',
            },
            style,
          ]}>
          {icon ? icon : ''}
          <TextInput
            onImageChange={onImageChange}
            autoCapitalize="none"
            onSubmitEditing={onSubmitEditing}
            ref={inputRef}
            keyboardType={keyboardType}
            multiline={textArea || multiline}
            style={[TextInputStyles.textInputStyle, textInputStyle]}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
            onChangeText={text => {
              let newText = text;
              if (sanitizationFunction) {
                newText = sanitizationFunction(text);
              }
              handleInputChange(formKey, newText);
            }}
            editable={editable}
            secureTextEntry={secureTextEntry ? eye : undefined}
            inputAccessoryViewID={
              Platform.OS === 'ios' &&
              useDone == true &&
              (keyboardType === 'phone-pad' || keyboardType === 'numeric')
                ? inputAccessoryViewID
                : undefined
            }
          />
          {icon1}
          {Platform.OS === 'ios' &&
            useDone == true &&
            (keyboardType === 'phone-pad' || keyboardType === 'numeric') && (
              <InputAccessoryView nativeID={inputAccessoryViewID}>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: 8,
                    alignItems: 'flex-end',
                  }}>
                  <Button onPress={Keyboard.dismiss} title="Done" />
                </View>
              </InputAccessoryView>
            )}

          {secureTextEntry ? (
            <TouchableOpacity
              onPress={() => setEye(!eye)}
              style={{position: 'absolute', right: responsiveWidth(5)}}>
              <Icons.Ionicons
                name={eye ? 'eye-off' : 'eye'}
                size={rhp(20)}
                color="#000000"
              />
            </TouchableOpacity>
          ) : null}
          {isOtpVerified ? (
            <View
              onPress={() => setEye(!eye)}
              style={{
                position: 'absolute',
                right: responsiveWidth(5),
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: rwp(6),
              }}>
              <Image source={IMAGES.VERIFICATION} style={styles.verification} />
              <Texts.pt12
                children={'Verified'}
                style={{color: '#005D03', fontWeight: '500'}}
              />
            </View>
          ) : null}
          {onGetOtpPress ? (
            <Texts.pt12
              onPress={onGetOtpPress}
              children={'Get OTP'}
              style={{
                fontWeight: 'bold',
                position: 'absolute',
                right: responsiveWidth(5),
              }}
            />
          ) : null}
          {onCalendarPress ? (
            <TouchableOpacity
              onPress={onCalendarPress}
              style={{position: 'absolute', right: responsiveWidth(3)}}>
              <Icons.FontAwesome5
                name={'calendar-alt'}
                size={rhp(23)}
                color="#6B6B6B"
              />
            </TouchableOpacity>
          ) : null}
          {onDropdownPress ? (
            <TouchableOpacity
              onPress={onDropdownPress}
              style={{position: 'absolute', right: responsiveWidth(5)}}>
              <Icons.MaterialIcons
                name={'keyboard-arrow-down'}
                size={rhp(30)}
                color="#9E9E9E"
              />
            </TouchableOpacity>
          ) : null}
          {onRightArrowPress ? (
            <TouchableOpacity
              onPress={onRightArrowPress}
              style={{position: 'absolute', right: responsiveWidth(5)}}>
              <Icons.MaterialIcons
                name={'keyboard-arrow-right'}
                size={rhp(30)}
                color="#9E9E9E"
              />
            </TouchableOpacity>
          ) : null}
          {onSearchPress ? (
            <TouchableOpacity
              onPress={onSearchPress}
              style={{position: 'absolute', right: responsiveWidth(5)}}>
              <Icons.AntDesign
                name={'search1'}
                size={rhp(22)}
                color="#9E9E9E"
              />
            </TouchableOpacity>
          ) : null}
          {onCrossPress ? (
            <TouchableOpacity
              onPress={onCrossPress}
              style={{position: 'absolute', right: responsiveWidth(5)}}>
              <Icons.Entypo name={'cross'} size={rhp(25)} color="#9E9E9E" />
            </TouchableOpacity>
          ) : null}
        </View>

        {error && <Text style={TextInputStyles.errorMsg}>{error}</Text>}
      </Pressable>
    </>
  );
};

export default memo(TextInput1);

export const styles = StyleSheet.create({
  titleTextStyle: {
    color: '#202020',
    marginBottom: rhp(7),
    fontWeight: '600',
    fontSize: responsiveFontSize(1.8),
  },
  verification: {
    height: responsiveWidth(5),
    width: responsiveWidth(5),
    resizeMode: 'contain',
  },
});

export const TextInputStyles = StyleSheet.create({
  errorMsg: {
    color: 'red',
    fontSize: responsiveFontSize(1.6),
    paddingHorizontal: rwp(5),
    top: rhp(4),
  },
  mainView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 7,
    backgroundColor: '#F5F5F5',
  },
  textInputStyle: {
    flex: 8.5,
    color: '#707070',
    paddingHorizontal: rwp(10),
    fontSize: responsiveFontSize(1.8),
    borderColor: '#0000006E',
    borderWidth: 0.5,
    borderRadius: 7,
    backgroundColor: 'white',
    textAlignVertical: 'top',
    // backgroundColor: 'pink',
    height: rhp(45),
  },
});

export const ErrorMSG = ({error, marginTop, textStyle}) => {
  if (error && marginTop) {
    return (
      <Text
        style={[
          TextInputStyles.errorMsg,
          {marginTop: rhp(marginTop)},
          textStyle,
        ]}>
        {error}
      </Text>
    );
  }

  if (error) {
    return <Text style={[TextInputStyles.errorMsg, textStyle]}>{error}</Text>;
  }

  return null;
};
