import React, { useState, createRef, useContext } from 'react';
import { View, ScrollView, Text, StyleSheet, } from 'react-native';
import Colors from 'sm/utils/Colors';
import CatTabs from './components/catTabs';
import { windowWidth } from 'sm/utils/Dimensions'
import ModDescBody from 'sm/components/Schedule/Events/ModDescBody';
import ModInputBody from 'sm/components/Schedule/Events/ModInputBody';
import VideoTab from 'sm/components/VideoTab';
import { AuthContext } from 'sm/navigation/AuthProvider';
import storage from '@react-native-firebase/storage';
import Loader from 'sm/components/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { RichEditor } from 'sm/components/Goals';
import { addValues } from './utils/fb-modulesHandler';
import { runKeyBoardList } from 'sm/screens/GoalScreen';
import InnerModal from 'sm/components/InnerModal';
import moment from 'moment';
import TopModal from 'sm/components/TopModal';

const initialMetrics = [{ title: 'Athlete Score', metricType: 'Count', unit: 'total', fixed: true },
{ title: 'Coach Score', metricType: 'Count', unit: 'total', fixed: true }];

export default function ModulesScreen({
  modules, showLoader, setShowLoader, fetchModule, deepNav, showMod, handleAddMod,
  setDeepNav, setShowMod, setShowMenu, shallowNav, setShallowNav, onEvent
}) {
  const { user } = useContext(AuthContext);

  const [scores, setScores] = useState(initialMetrics);
  const [modInput, setModInput] = useState({
    value: '', isValid: null, isDisabled: false
  });
  const [pics, setPics] = useState([]);
  const [vids, setVids] = useState([]);
  const [assetsRef, setAssetsRef] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState([]);
  const [uploadErr, setUploadErr] = useState([]);
  const [topErr, setTopErr] = useState({});
  const [editorHtml, setEditorHtml] = useState('');
  const [downloadUrls, setDownloadUrls] = useState([]);
  const [writeStatus, setWriteStatus] = useState('');
  const [assetsToDel, setAssetsToDel] = useState([]);
  const [metLoading, setMetLoading] = useState({ remove: '', add: false });

  const richTextRef = createRef();
  const linkModalRef = createRef();

  useFocusEffect(
    React.useCallback(() => {
      initializeState()
      runKeyBoardList({ callback: setShowMenu })

      return () => {
        runKeyBoardList({ event: 'remove', callback: setShowMenu })
        initializeState()
      };
    }, [])
  );

  const initializeState = () => {
    setScores(initialMetrics)
    setWriteStatus('')
    setModInput({ value: '', isValid: null, isDisabled: false });
    setShowMenu(true)
    setPics([]);
    setVids([]);
    setEditorHtml('');
    setUploadSuccess([]);
    setDownloadUrls([]);
    setMetLoading({ remove: '', add: false })
  }

  const handleCheckWriteStatus = (updScoreArr, addedModTitle) => {
    if (writeStatus === 'edit') {
      return handleSaveOrUpdate(() => updateCallback(updScoreArr), addedModTitle)
    }

    handleSaveOrUpdate(saveCallback, addedModTitle)
  }

  const checkFullValidate = () => new Promise((resolve, reject) => {
    setModInput({
      ...modInput,
      isValid: (modInput.isValid === true)
    })
    const { cat, subCat } = deepNav;

    let data;
    if (shallowNav.cat) {
      data = modules[shallowNav.cat]
    } else {
      data = modules[cat][subCat]
    }

    let isTitlePresent
    if (writeStatus === 'new') {
      isTitlePresent = data?.some(e => e.title === modInput.value)
    } else {
      isTitlePresent = data?.filter(e => e.title !== showMod.name).includes(modInput.value)
    }

    // console.log('titlePres', isTitlePresent);
    setTimeout(() => {
      (modInput.isValid && !isTitlePresent) ? resolve(true) : reject(isTitlePresent ? 'titlePresent' : false)
    }, 0);
  })

  const handleSaveOrUpdate = (callback, modTitle) => {
    setModInput({ ...modInput, isDisabled: true });
    checkFullValidate().then(() => {
      if (!editorHtml) {
        setModInput({ ...modInput, isDisabled: false });
        return setTopErr({
          val: true,
          message: 'Please describe your module.'
        })
      }

      let stillProcessing = uploadSuccess.map(i => Object.values(i)[0]).includes(false)
      if (stillProcessing) {
        setModInput({ ...modInput, isDisabled: false });
        return setTopErr({
          val: true,
          message: 'Still processing files. Kindly wait'
        })
      }

      setAssetsRef([]);
      callback(modTitle)
    }).catch((e) => {
      console.log('valError', e.message);
      setModInput({ ...modInput, isDisabled: false });
      if (e.message === 'titlePresent') setErr({ val: true, message: 'Title already present in module!' })
    });
  }

  const { cat, subCat } = deepNav;

  const saveCallback = (modTitle) => {
    const runNext = () => {
      if (shallowNav.cat) {
        return fetchModule(shallowNav.cat, () => {
          setShowMod({ show: true, name: modTitle })
          initializeState()
        })
      }
      fetchModule(cat, () => {
        setShowMod({ show: true, name: modTitle })
        initializeState()
      })
    }

    setModInput({ ...modInput, isDisabled: true });

    const modDetails = {
      title: modInput.value,
      description: editorHtml,
      assets: downloadUrls,
      metrics: scores,
      created_at: moment().format(),
      updated_at: moment().format()
    }
    console.log('mod', modDetails);

    if (shallowNav.cat) {
      return addValues({ user, type: 'addModNullSubCat', cat: shallowNav.cat, subCat, entry: modDetails, callback: runNext })
    }
    addValues({ user, type: 'addMod', cat, subCat, entry: modDetails, callback: runNext })
  }

  const updateCallback = (updScoreArr, modTitle) => {
    const runNext = () => {
      // console.log('llllllldel', assetsToDel);
      handleDestroyAssets(assetsToDel);
      if (shallowNav.cat) {
        return fetchModule(shallowNav.cat, () => {
          setShowMod({ show: true, name: modTitle })
          initializeState()
        })
      }
      fetchModule(cat, () => {
        setShowMod({ show: true, name: modTitle })
        initializeState()
      })
    }

    setModInput({ ...modInput, isDisabled: true });

    const [prevMod] = modules[cat][subCat].filter(e => e.title === showMod?.name);

    console.log('down', downloadUrls);
    const modDetails = {
      title: modInput.value,
      description: editorHtml,
      assets: downloadUrls,
      updated_at: moment().format()
    }
    updScoreArr.forEach(e => {
      if (scores[e].isVisible) modDetails[e] = scores[e].val
    })
    const prevModKeys = Object.keys(prevMod)
    const excludedEntry = ['title', 'description', 'assets']
    prevModKeys.forEach(e => {
      if (!excludedEntry.includes(e)) modDetails[e] = prevMod[e]
    })

    const updMods = [modDetails, ...modules[cat][subCat].filter(e => e.title !== showMod?.name)]
    console.log('mod', JSON.stringify(modDetails, null, 2));

    addValues({ user, type: 'updMod', cat, subCat, entry: updMods, callback: runNext })
  }

  const handleGoBack = () => {
    handleDestroyAssets(assetsRef);
    initializeState()
    setShowMod({ show: false })
  }

  const handleDestroyAssets = (delArr) => {
    console.log('destttroy', delArr);
    delArr.forEach(ar => {
      try {
        storage().ref(ar).delete()
      } catch (error) {
      }
    })
  }

  let modDescDets = [{}];
  // console.log('cattttts', cat, subCat);
  if (shallowNav.cat && showMod.name) {
    console.log('showMod', showMod.name);
    // console.log('toucheddddddd', showMod.name);
    modDescDets = modules[shallowNav.cat].filter(e => e.title === showMod?.name);
  }
  if (modules[cat] && modules[cat][subCat] && showMod.name) {
    modDescDets = modules[cat][subCat].filter(e => e.title === showMod?.name);
  }
  // console.log('cat-subcat', cat, subCat, modDescDets,
  //   'mods', modules, 'name', showMod.name);
  console.log('dets', modDescDets);

  const handleStartUpd = () => {
    setWriteStatus('edit');
    setAssetsToDel([]);
    setEditorHtml(modDescDets[0]?.description);

    const newPics = [], newVids = [], newDownloads = [], newUpldSucc = [];
    modDescDets[0]?.assets.forEach((e, i) => {
      const { file, mediaType, assetRef } = e;
      const media = {
        fileName: file,
        filePath: file,
        fileSize: 0,
        assetRef,
        setToDel: true,
        id: i
      }

      if (mediaType === 'image') {
        newPics.push(media)
      } else if (mediaType === 'video') {
        newVids.push(media)
      }
      newDownloads.push({ file, mediaType, assetRef });
      newUpldSucc.push({ [`${i}-${file}`]: true })
    })
    setPics([...newPics, ...pics])
    setVids([...newVids, ...vids])
    setDownloadUrls([...newDownloads, ...downloadUrls]);
    setUploadSuccess([...newUpldSucc, ...uploadSuccess]);
  }

  const handleAddMet = (metric, callback) => {
    let entry;
    if (shallowNav.cat) {
      const updMod = modules[shallowNav.cat].filter(e => e.title === showMod?.name)[0];
      updMod.metrics = [...updMod.metrics, metric]
      entry = [updMod, ...modules[shallowNav.cat].filter(e => e.title !== showMod?.name)]
    } else {
      const updMod = modules[cat][subCat].filter(e => e.title === showMod?.name)[0];
      updMod.metrics = [...updMod.metrics, metric]
      entry = [updMod, ...modules[cat][subCat].filter(e => e.title !== showMod?.name)]
    }

    console.log('entry', JSON.stringify(entry, null, 2));
    addOrDelMet(entry, callback)
  }

  const handleRemoveMet = (metric, callback) => {
    let entry;
    if (shallowNav.cat) {
      const updMod = modules[shallowNav.cat].filter(e => e.title === showMod?.name)[0];
      updMod.metrics = updMod.metrics.filter(e => e.title !== metric.title);
      entry = [updMod, ...modules[shallowNav.cat].filter(e => e.title !== showMod?.name)]
    } else {
      const updMod = modules[cat][subCat].filter(e => e.title === showMod?.name)[0];
      updMod.metrics = updMod.metrics.filter(e => e.title !== metric.title);
      entry = [updMod, ...modules[cat][subCat].filter(e => e.title !== showMod?.name)]
    }

    addOrDelMet(entry, callback)
  }

  const addOrDelMet = (entry, callback) => {
    const runNext = () => {
      if (shallowNav.cat) {
        if (callback) callback()
        return setModules({
          ...modules,
          [shallowNav.cat]: entry
        })
      }
      if (callback) callback()
      setModules({
        ...modules,
        [cat]: {
          ...modules[cat],
          [subCat]: entry
        }
      })
    }
    if (shallowNav.cat) {
      return addValues({ user, type: 'updMod', cat: shallowNav.cat, subCat: null, entry, callback: runNext })
    }
    addValues({ user, type: 'updMod', cat, subCat, entry, callback: runNext })
  }

  let modToAdd = {}
  if (onEvent) {
    if (modules[cat] && modules[cat][subCat] && showMod.name) {
      let [mod] = modules[cat][subCat].filter(e => e.title === showMod?.name);
      const addedInputs = mod.metrics.map(e => {
        if (!e.fixed) {
          return { ...e, value: null }
        }
        return e
      })
      modToAdd = { title: mod.title, description: mod.description, metrics: addedInputs }
    }
    if (modules[shallowNav.cat] && showMod.name) {
      let [mod] = modules[shallowNav.cat].filter(e => e.title === showMod?.name)
      const addedInputs = mod.metrics.map(e => {
        if (!e.fixed) {
          return { ...e, value: null }
        }
        return e
      })
      modToAdd = { title: mod.title, description: mod.description, metrics: addedInputs }
    }
  }
  // console.log('ModToAdd', modToAdd);

  const rightText = <Text onPress={() => handleAddMod(modToAdd)} style={styles.text}>Add to Event</Text>;
  const leftText = <Text onPress={() => setShowMod(false, '')} style={[styles.text, { color: Colors.Orange }]}>Cancel</Text>

  return (
    <ScrollView>
      { showLoader ? <Loader /> :
        <>
          {showMod?.show ?
            <>
              {!writeStatus ?
                onEvent ? <InnerModal topModal={<TopModal leftText={leftText}
                  midText={<Text style={{ flexGrow: 0.4 }} />}
                  rightText={rightText} />}>
                  <ModDescBody details={modDescDets[0]}
                    handleGoBack={() => setShowMod({ show: false })} removeLoading={metLoading}
                    shouldUpdate={handleStartUpd} removeMet={handleRemoveMet}
                    addMet={handleAddMet} setRemoveLoading={setMetLoading}
                    setShowMod={(show, name) => setShowMod({ show, name })} topTab />
                </InnerModal>
                  : <ModDescBody details={modDescDets[0]} removeMet={handleRemoveMet}
                    handleGoBack={() => setShowMod({ show: false })}
                    setRemoveLoading={setMetLoading} removeLoading={metLoading}
                    shouldUpdate={handleStartUpd} addMet={handleAddMet}
                    setShowMod={(show, name) => setShowMod({ show, name })} topTab />
                : <ModInputBody modInput={modInput} setModInput={setModInput}
                  setScores={setScores} scores={scores} showModName={showMod?.name}
                  setWriteStatus={() => setWriteStatus('')} details={modDescDets[0]}
                  handleSaveOrEditMod={handleCheckWriteStatus} writeStat={writeStatus}
                  handleGoBack={handleGoBack}
                  topTab
                  editor={<RichEditor
                    uploadSuccess={[uploadSuccess, setUploadSuccess]}
                    uploadErr={[uploadErr, setUploadErr]}
                    downloadUrl={[downloadUrls, setDownloadUrls]}
                    pics={[pics, setPics]}
                    vids={[vids, setVids]}
                    assetRef={[assetsRef, setAssetsRef]}
                    setTopErr={setTopErr}
                    topErr={topErr}
                    handleSaveHtml={(html) => {
                      setEditorHtml(html)
                    }}
                    placeholder='Module information...'
                    updateDesc={editorHtml}
                    writeStatus={writeStatus}
                    goalTitle={modInput.value}
                    richText={richTextRef}
                    linkModal={linkModalRef}
                    singleMedia
                    mediaFolder="Modules"
                    setAssetsToDel={(val) =>
                      setAssetsToDel([val, ...assetsToDel])}
                  />}
                />}
            </>
            : <CatTabs setShowMod={(show, name) => setShowMod({ show, name })}
              modules={modules} setShowLoader={setShowLoader} fetchModule={fetchModule}
              deepNav={deepNav} setDeepNav={setDeepNav}
              shallowNav={shallowNav} setShallowNav={setShallowNav}
              shouldAddNew={() => setWriteStatus('new')} />}
        </>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
