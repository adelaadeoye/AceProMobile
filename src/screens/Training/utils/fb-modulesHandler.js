import firestore from '@react-native-firebase/firestore';

const defMod = {
  metrics: [
    {
      fixed: true,
      title: "Athlete Score",
      unit: "total",
      metricType: "Count"
    },
    {
      fixed: true,
      title: "Coach Score",
      unit: "total",
      metricType: "Count"
    }
  ],
  title: "Trading",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ultrices mi tempus imperdiet nulla malesuada. Sed ullamcorper morbi 
  tincidunt ornare massa eget. Id volutpat lacus laoreet non curabitur gravida.
  Elementum nisi quis eleifend quam adipiscing vitae proin. Etiam dignissim 
  diam quis enim lobortis scelerisque fermentum dui faucibus. Non quam 
  lacus suspendisse faucibus interdum posuere lorem ipsum dolor. 
  Quam adipiscing vitae proin sagittis nisl rhoncus mattis. `,
  assets: [{
    /*             ************************
      Please upload the default asset and set the file 
      properties here before pushing to production 
                   ************************
    */
    assetsRef: 'Modules/default/ice_screenshot_20210124-182054.png',
    file: `${'https://firebasestorage.googleapis.com/v0/b/acepro-mobile.appspot.com'}${'/o/Modules%2Fdefault%2Fice_screenshot_20210124-182054.png?alt=media&token='}${'beacd65e-9636-49e2-9332-3e4d772766c4'}`,
    mediaType: 'image'
  }]
}

const defMods = ['Finishing', 'Trading', 'Building', 'Turning the point around', 'Neutralizing', 'Staying']
  .map(title => ({ ...defMod, title }))

export const loadDefaults = (user, callback) => {
  const defCats = ['Technical', 'Tactical', 'Physical', 'Mental', 'Outcomes'];
  const defCatsObj = {
    'Technical': {
      'Serve':
        [],
      'Forehand':
        [],
      'Volley':
        [],
      'Return':
        [],
      'Backhand':
        [],
    },
    'Tactical': {
      'Serving':
        defMods,
      'Both Back':
        defMods,
      'Opponent at / approaching the net':
        defMods,
      'Returning':
        defMods,
      'At / approaching the net':
        defMods,
    },
    'Physical': {},
    'Mental': {},
    'Outcomes': {}
  }

  try {
    let batch = firestore().batch();
    const titlesObj = {};

    // Defaults for modules with categories and subcategories
    defCats.forEach(cat => {
      batch.set(firestore().collection('Training')
        .doc(user.email).collection('Module')
        .doc(cat), defCatsObj[cat]);
      titlesObj[cat] = Object.keys(defCatsObj[cat]);
    });

    // Defaults to easily retrieve categories and subcategories title
    const titleRef = firestore().collection('Training')
      .doc(user.email)
    batch.set(titleRef, titlesObj)

    batch.commit().then(() => {
      getTitles(user, callback)
    })
  } catch (error) {

  }
}

export const getTitles = async (user, callback) => {
  let titles = null;
  try {
    await firestore().collection('Training')
      .doc(user.email).get().then((doc) => {
        const data = doc.data();
        if (Object.keys(data).length) {
          titles = data
        } else {
          titles = null;
        }
      })
      console.log('useer', titles);
    callback(titles)
  } catch (error) {
    callback(titles)
  }
}

export const getModules = async (user, cat, callback) => {
  let mods = [];
  try {
    console.log('doc', cat);
    await firestore().collection('Training')
      .doc(user.email).collection('Module')
      .doc(cat).get().then((doc) => {
        const exceptions = ["Physical", "Mental", "Outcomes"];
        if (exceptions.includes(cat)) {
          mods = doc.data().data;
          console.log('fetch', mods);
        } else {
          mods = doc.data();
        }
        // mods = mods.sort((a, b) => a.created_at - b.created_at);
      })
    callback(mods)
  } catch (error) {
    callback(mods)
  }
}

export const addValues = async (
  { user, type, cat, subCat, entry, callback }) => {
  try {
    switch (type) {
      case 'cat':
        await addCat(user, cat);
        break;
      case 'subCat':
        await addSubCat(user, cat, subCat);
        break;
      case 'addModNullSubCat':
        await addModNullSub(user, cat, entry)
        break;
      case 'updMod':
        await updModule(user, cat, subCat, entry)
        break;
      default:
        await addModule(user, cat, subCat, entry)
        break;
    }
    callback()
  }
  catch (error) {

  }
}

const addCat = async (user, cat) => await firestore().collection('Training')
  .doc(user.email).collection('Module')
  .doc(cat).set({})

const addSubCat = async (user, cat, subCat) => await firestore().collection('Training')
  .doc(user.email).collection('Module')
  .doc(cat).update({ [subCat]: [] })

const addModule = async (user, cat, subCat, entry) => await firestore().collection('Training')
  .doc(user.email).collection('Module')
  .doc(cat).update({ [subCat]: firestore.FieldValue.arrayUnion(entry) })

const addModNullSub = async (user, cat, entry) => {
  await firestore().collection('Training')
    .doc(user.email).collection('Module')
    .doc(cat).update({ data: firestore.FieldValue.arrayUnion(entry) })
}

const updModule = async (user, cat, subCat, entry) => {
  if (!subCat) {
    return await firestore().collection('Training')
      .doc(user.email).collection('Module')
      .doc(cat).update({ data: entry })
  }
  return await firestore().collection('Training')
    .doc(user.email).collection('Module')
    .doc(cat).update({ [subCat]: entry })
}
