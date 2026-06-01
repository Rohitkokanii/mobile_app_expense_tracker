import {convertImage} from 'react-native-simple-heic2jpg';
import RNFS from 'react-native-fs';

export const checkHeicAndReplacewithJPG = fileName => {
  const lowerCaseFileName = fileName.toLowerCase();
  if (lowerCaseFileName.endsWith('.heic')) {
    return fileName.substring(0, fileName.lastIndexOf('.')) + '.jpg';
  } else {
    return fileName;
  }
};
export const checkHeicTypeAndReplaceJpg = fileType => {
  if (fileType == 'image/heic') {
    return 'image/jpeg';
  } else {
    return fileType;
  }
};
export const checkHeicAndConvertToJpg = async (filePath, originalPath) => {
  const lowerCaseFilePath = filePath.toLowerCase();
  if (lowerCaseFilePath.endsWith('.heic')) {
    const result = await convertImage(originalPath);
    const exists = await RNFS.exists(result);
    console.log({exists});
    return result;
  } else {
    return filePath;
  }
};
