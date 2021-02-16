import firestore from '@react-native-firebase/firestore';

export const saveGoal = (user, goalDetails, callback) => {
  const customRef = firestore().collection('Goals')
    .doc(user.email).collection('GoalsData').doc(goalDetails.created_at);
  try {
    customRef.set(goalDetails).then(() => {
      if (callback) callback()
    })
    // setInitialVal(user, 'Goals', goalDetails.title, goalType)
  } catch (error) {

  }
}

export const updateGoal = (user, goalDetails, timeStamp, callback) => {
  const customRef = firestore().collection('Goals')
    .doc(user.email).collection('GoalsData').doc(timeStamp);
  try {
    customRef.update(goalDetails)
      .then(() => {
        if (callback) callback()
      })
  } catch (error) { }
}

export const deleteGoal = (user, timeStamp, runNext) => {
  console.log(timeStamp);
  const customRef = firestore().collection('Goals')
    .doc(user.email).collection('GoalsData').doc(timeStamp);
  customRef.delete()
    .then(() => runNext())
    .catch(() => runNext())
}

export const getGoal = async (user, callback) => {
  let goals = [];
  try {
    await firestore().collection('Goals')
      .doc(user.email).collection('GoalsData').orderBy('created_at')
      .get().then((snap) => {
        if (!snap.forEach) {
          return
        }
        snap.forEach(doc => {
          goals.push(doc.data())
        })
      })
    goals = goals.reverse()
    callback(goals)
  } catch (error) {
    callback(goals)

  }
}

export const togglCompleteGoal = (user, updatedGoal, timeStamp, runNext) => {
  try {
    firestore().collection('Goals')
      .doc(user.email).collection('GoalsData').doc(timeStamp)
      .update(updatedGoal).then(() => runNext())
  } catch (error) { }
}

export const setInitialVal = (user, ref, entry, goalType) => {
  try {
    const mainRef = firestore().collection(ref).doc(user.email)
    mainRef.get().then((doc) => {
      if (!doc.exists) {
        mainRef.set({
          [goalType]: [entry]
        })
      } else {
        mainRef.update({
          [goalType]: firestore.FieldValue.arrayUnion(entry)
        })
      }
    })
  } catch (error) { }
}