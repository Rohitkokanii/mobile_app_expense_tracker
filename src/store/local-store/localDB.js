import AsyncStorage from '@react-native-async-storage/async-storage';
import {postApi} from '../../network/postApi';

// token
export async function saveToken(value) {
  try {
    result = await AsyncStorage.setItem('token', `${value}`);
    console.log('Token Saved', value);
  } catch (e) {
    console.warn(`Error is ${e}`);
  }
}
export async function getToken() {
  try {
    value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.warn(`Error is ${e}`);
  }
}
export async function removeToken() {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {
    console.warn(`Error is ${e}`);
  }
}

export const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Stored object with key ${key}`);
  } catch (error) {
    console.error(`Error storing object with key ${key}: ${error}`);
  }
};

// Function to retrieve an object from AsyncStorage
export const getObject = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      // Parse the JSON string back into an object
      const value = JSON.parse(jsonValue);
      console.log(`Retrieved object with key ${key}`);
      return value;
    } else {
      console.log(`Object with key ${key} not found in AsyncStorage`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving object with key ${key}: ${error}`);
    return null;
  }
};

export const RemoveObject = async key => {
  try {
    const jsonValue = await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error Removeing object with key ${key}: ${error}`);
    return null;
  }
};
