import firestore from '@react-native-firebase/firestore';

export function createUser(mail, userDetails) {
  try {
    firestore()
      .collection('Users')
      .doc(mail)
      .set(userDetails)
  } catch (error) {

  }
}

export function updateUser(mail, userDetails) {
  try {
    firestore()
      .collection('Users')
      .doc(mail)
      .update(userDetails)
  } catch (error) {

  }
}