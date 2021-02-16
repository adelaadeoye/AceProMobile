import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export const saveEvent = (user, eventDetails, callback) => {
  const customRef = firestore()
    .collection('Training')
    .doc(user.email)
    .collection('Schedule')
    .doc(eventDetails.created_at);
  try {
    customRef.set(eventDetails).then(() => {
      if (callback) callback();
    });
  } catch (error) {}
};

export const getEvents = async (user, callback) => {
  try {
    let events = [];
    await firestore()
      .collection('Training')
      .doc(user.email)
      .collection('Schedule')
      .get()
      .then((snap) => {
        if (!snap.forEach) {
          return;
        }
        snap.forEach((doc) => {
          const data = doc.data();
          let formatedData = {
            ...data,
            start: moment(data.start_date).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(data.end_date).format('YYYY-MM-DD HH:mm:ss'),
          };
          events.push(formatedData);
        });
      });
    callback(events);
  } catch (error) {
    callback([]);
  }
};

export const getUsers = async (user, callback) => {
  //TODO this was where i chaneged the inivitee
  let users = [];
  try {
    await firestore()
      .collection('Users')
      .get()
      .then((snap) => {
        if (!snap.forEach) {
          return;
        }
        snap.forEach((doc) => {
          const data = doc.data();
          const {email, first_name = '', last_name = '', user_type = ''} = data;
          if (email !== user.email) {
            users.push({email, first_name, last_name});
          }
        });
      });
    callback(users);
  } catch (error) {
    callback(users);
  }
};
