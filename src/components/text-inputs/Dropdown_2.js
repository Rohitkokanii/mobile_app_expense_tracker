// src/components/dropdowns/Dropdown_2.js
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import {memo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Texts} from '../common/Texts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {rhp, rwp} from '../../utils/helpers/responsivePixelHelper';
import {styles, TextInputStyles} from './TextInput1';
import Icons from '../common/Icons';
import layout from '../../theme/layout';
export const data = [
  {id: 1, name: 'item1'},
  {id: 2, name: 'item2'},
  {id: 3, name: 'item3'},
];
const Dropdown_2 = ({
  handleInputChange,
  Placeholder,
  Error,
  FormObjName,
  Title,
  onDropdown,
  MainContainer,
  NameField,
  IDField,
  SelectedOptionID,
  data = [],
  Disable,
  DropdownStyles,
  titleTextStyle,
  dropdownContainer,
  markCompulsory,
  TextArea,
  customicon,
  ListError,
}) => {
  console.log({data});

  const navigation = useNavigation();
  const route = useRoute();

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const selectedItem = data?.find(item => item[IDField] === SelectedOptionID);

  const filteredData = data?.filter(item =>
    item[NameField]?.toLowerCase()?.includes(searchText.toLowerCase()),
  );

  const handleSelect = item => {
    handleInputChange(FormObjName, item[NameField]);
    handleInputChange(FormObjName + 'ID', item[IDField]);
    setModalVisible(false);
  };

  return (
    <View
      style={[
        {
          flexDirection: 'column',
          borderRadius: rhp(25),
          borderColor: '#707070',
          justifyContent: 'center',
        },
        MainContainer,
      ]}>
      <View style={{flexDirection: 'row'}}>
        {Title ? (
          <Text style={[titleTextStyle, styles.titleTextStyle]}>{Title}</Text>
        ) : null}
        {markCompulsory && (
          <Icons.FontAwesome
            name={'asterisk'}
            size={responsiveHeight(0.7)}
            color={'#FF5757'}
          />
        )}
      </View>

      {/* Dropdown trigger */}
      <TouchableOpacity
        style={[
          TextInputStyles.mainView,
          {
            alignItems: 'center',
            height: rhp(38),
            // textAlignVertical: 'top',
            borderBottomColor: 'black',
            borderBottomWidth: responsiveHeight(0.1),
            // paddingHorizontal: rhp(10),
          },
          DropdownStyles,
        ]}
        disabled={Disable}
        onPress={() => !Disable && setModalVisible(true)}>
        <Texts.pt14
          key={selectedItem}
          numberOfLines={1}
          style={{
            color: selectedItem ? '#202020' : '#202020',
            fontSize: responsiveFontSize(1.8),
            // paddingLeft: rwp(5),
          }}>
          {selectedItem ? selectedItem[NameField] : Placeholder}
        </Texts.pt14>

        <Icons.MaterialIcons
          name={isModalVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          color="#858585"
          size={rhp(20)}
          style={{position: 'absolute', right: responsiveWidth(3)}}
        />
      </TouchableOpacity>

      {Error && <Text style={TextInputStyles.errorMsg}>{Error}</Text>}

      {/* Modal Dropdown */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles2.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={[styles2.modalContainer, dropdownContainer]}>
            <TextInput
              placeholder="Search"
              style={styles2.inputSearchStyle}
              value={searchText}
              onChangeText={setSearchText}
            />
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                keyExtractor={item => item[IDField]?.toString()}
                style={{maxHeight: rhp(250)}}
                renderItem={({item}) => {
                  const isSelected = item[IDField] === SelectedOptionID;
                  return (
                    <TouchableOpacity
                      style={[
                        styles2.itemContainer,
                        isSelected && styles2.selectedItemContainer,
                      ]}
                      onPress={() => handleSelect(item)}>
                      <Texts.pt14
                        style={[
                          styles2.itemText,
                          isSelected && styles2.selectedItemText,
                        ]}>
                        {item[NameField]}
                      </Texts.pt14>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <View style={{padding: 10}}>
                <Texts.pt14 style={{textAlign: 'center'}}>
                  {`${ListError}` || 'No data found'}
                </Texts.pt14>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default memo(Dropdown_2);

const styles2 = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: rwp(20),
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    maxHeight: rhp(350),
  },
  itemText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: responsiveFontSize(1.7),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  selectedItemContainer: {
    backgroundColor: '#E3F2FD',
  },
  selectedItemText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
