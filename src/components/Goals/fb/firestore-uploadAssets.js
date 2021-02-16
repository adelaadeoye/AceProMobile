import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import auth from '@react-native-firebase/auth'
import moment from 'moment';

export const FireBaseStorage = storage();

export const getFileName = (name, path) => {
  if (name != null) { return name; }

  if (Platform.OS === "ios") {
    path = "~" + path.substring(path.indexOf("/Documents"));
  }
  return path.split("/").pop();
}

export const uploadImageToStorage = async (path, resp, id, headPath, assetRef) => {
  let reference = createStorageRefToFile(resp, id, headPath);

  const data = await RNFS.readFile(path, 'base64');
  const metaData = { customMetadata: { assetRef, created_at: moment().format() } };

  return reference.putString(data, 'base64', metaData);
}

export const getPercentage = ratio => Math.round(ratio * 100);

export const createStorageRefToFile = (response, id, headPath) => {
  const { fileName } = response;
  const user = auth().currentUser;
  return FireBaseStorage.ref(`${headPath}/${user.email}/${id}-${fileName}`);
};

export const uploadFileToFireBase = (imagePickerResponse, id, headPath, assetRef) => {
  let path = imagePickerResponse.uri;
  // let fileName = getFileName(imagePickerResponse.fileName, path);
  return uploadImageToStorage(path, imagePickerResponse, id, headPath, assetRef);
};