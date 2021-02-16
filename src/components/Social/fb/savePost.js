import firestore from '@react-native-firebase/firestore';

export const savePost = (postDetails, callback) => {
  const customRef = firestore().collection('Social')
    .doc('All').collection('Team Type').doc(postDetails.created_at);
  try {
    customRef.set(postDetails).then(() => {
      if (callback) callback()
    })
  } catch (error) {

  }
}

export const getUser = (user, callback) => {
  let userDet = { email: 'null@mail.co' };
  const customRef = firestore().collection('Users')
    .doc(user.email);
  try {
    customRef.get().then((doc) => {
      userDet = doc.data();
      callback(userDet);
    })
  } catch (error) {
    callback(userDet)
  }
}

export const getUsers = (callback) => {
  let users = [];
  const customRef = firestore().collection('Users');
  try {
    customRef.get().then((snap) => {
      if (!snap.forEach) {
        return
      }
      snap.forEach(doc => {
        const { email, first_name, last_name } = doc.data();
        const det = { email, firstName: first_name, lastName: last_name };
        users.push(det)
      })
      callback(users);
    })
  } catch (error) {
    callback(users)
  }
}

export const getPost = async (callback) => {
  let posts = [];
  try {
    await firestore().collection('Social')
      .doc('All').collection('Team Type')
      .get().then((snap) => {
        if (!snap.forEach) {
          return
        }
        snap.forEach(doc => {
          posts.push(doc.data())
        })
        posts = posts.sort((a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).reverse()
      })
    callback(posts)
  } catch (error) {
    callback(posts)

  }
}

export const saveComm = (commDetails, callback) => {
  const { commented_post: { post_creation } } = commDetails;
  const customRef = firestore().collection('Social')
    .doc('All').collection('Team Type').doc(post_creation);
  try {
    customRef.update({
      comments: firestore.FieldValue.arrayUnion(commDetails)
    }).then(() => callback())
  } catch (error) {

  }
}

export const saveLike = (likeDetails, post_creation, callback) => {
  console.log('touchedddd')
  const customRef = firestore().collection('Social')
    .doc('All').collection('Team Type').doc(post_creation);
  try {
    customRef.update({
      likers: firestore.FieldValue.arrayUnion(likeDetails)
    }).then(() => callback())
  } catch (error) {

  }
}

export const delLike = (likeDetails, postCreation, callback) => {
  const customRef = firestore().collection('Social')
    .doc('All').collection('Team Type').doc(postCreation);
  try {
    customRef.update({
      likers: firestore.FieldValue.arrayRemove(likeDetails)
    }).then(() => callback())
  } catch (error) {

  }
}

export const saveBookMark = (bkMkDet, postCreation, callback) => {
  console.log('touchedddd')
  const customRef = firestore().collection('Social')
    .doc('All').collection('Team Type').doc(postCreation);
  try {
    customRef.update({
      bookMarks: firestore.FieldValue.arrayUnion(bkMkDet)
    }).then(() => callback())
  } catch (error) {

  }
}

export const delBookMark = (bkMkDet, postCreation, callback) => {
  const customRef = firestore().collection('Social')
    .doc('All').collection('Team Type').doc(postCreation);
  try {
    customRef.update({
      bookMarks: firestore.FieldValue.arrayRemove(bkMkDet)
    }).then(() => callback())
  } catch (error) {

  }
}

export const addBoardBookMark = (user, board, post, callback) => {
  const customRef = firestore().collection('Social')
    .doc(user.email).collection('BookMarks').doc(board); // Start
  try {
    customRef.get().then(doc => {
      if (doc.exists) {
        customRef.update({
          [board]: firestore.FieldValue.arrayUnion(post)
        }).then(() => {
          if (callback) callback();
        })
      } else {
        customRef.set({
          [board]: firestore.FieldValue.arrayUnion(post)
        }).then(() => {
          if (callback) callback()
        })
      }
    })
  } catch (error) { }
}

export const getBoardBookmark = async (user, callback) => {
  let bookMarks = {};
  try {
    const customRef = firestore().collection('Social')
      .doc(user.email).collection('BookMarks');
    await customRef.get().then((snap) => {
      if (!snap.forEach) {
        return
      }
      snap.forEach(doc => {
        bookMarks = {
          ...bookMarks,
          ...doc.data()
        }
      })
    })
    callback(bookMarks)
  } catch (error) {
    callback(bookMarks)
  }
}

export const delBoardBookMark = (user, board, post, callback) => {
  try {
    const customRef = firestore().collection('Social')
      .doc(user.email).collection('BookMarks').doc(board);
    console.log('post-creation2', post, 'board', board);
    customRef.update({
      [board]: firestore.FieldValue.arrayRemove(post)
    }).then(() => {
      console.log('toucheddddddddd');
      callback()
    })
  } catch (error) {

  }
}

export const saveBoard = async (user, board, callback) => {
  const customRef = firestore().collection('Social')
    .doc(user.email).collection('Boards').doc();
  try {
    customRef.get().then((doc) => {
      if (!doc.exists) {
        customRef.set({ boards: [board] }).then(() => {
          if (callback) callback()
        })
      } else {
        customRef.update({
          boards: firestore.FieldValue.arrayUnion(board)
        })
      }
    })
  } catch (error) {

  }
}

export const getBoards = async (user, callback) => {
  let boards = [];
  try {
    await firestore().collection('Social')
      .doc(user.email).collection('Boards')
      .get().then((snap) => {
        if (!snap.forEach) {
          return
        }
        snap.forEach(doc => {
          boards = doc.data()?.boards || []
        })
      })
    callback(boards)
  } catch (error) {
    callback(boards)
  }
}
