import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text, View, LogBox } from 'react-native';
import TimeTabs from 'sm/components/TopTabs';
import { Day, Week, Month } from 'sm/components/Schedule'
import { times } from 'sm/utils/Constants';
import { AuthContext } from 'sm/navigation/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import Colors from 'sm/utils/Colors';
import { getEvents } from 'sm/screens/Training/utils/fb-saveEvents';
import Modules from './ModulesScreen';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getModules, getTitles, loadDefaults, delMetric } from './utils/fb-modulesHandler';

export default function Calender({ navigation, setShowMenu }) {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('Today')
  const [showLoader, setShowLoader] = useState(true);
  const [events, setEvents] = useState([]);
  const [modules, setModules] = useState({})
  const [deepNav, setDeepNav] = useState({});
  const [shallowNav, setShallowNav] = useState({});
  const [showMod, setShowMod] = useState({ show: false, name: '' });
  const [err, setErr] = useState({ val: false })

  useEffect(() => {
    LogBox.ignoreLogs(['Unhandled Promise Rejection']);
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      setShowLoader(true)
      if (!modules?.titles) {
        fetchEvent();
        fetchModTitles();
      } else {
        setShowLoader(false);
      }

      return () => {
        initializeState();
      };
    }, [])
  );

  const initializeState = () => {
    setShowLoader(true);
    setDeepNav({});
    setShallowNav({});
    setShowMod({ show: false, name: '' });
    setErr({ val: false });
    setActiveTab('Today');
  }

  const fetchEvent = async () => {
    setShowLoader(true)
    const runNext = (data) => setEvents(data);
    await getEvents(user, runNext)
  }

  const fetchModTitles = async () => {
    setShowLoader(true)
    const runNext = (data) => {
      setModules(
        {
          ...modules,
          titles: data
        })
      setShowLoader(false)
    }

    const runCheck = (data) => {
      console.log('data', data);
      if (!data) {
        loadDefaults(user, runNext)
      } else {
        setModules(
          {
            ...modules,
            titles: data
          })
        setShowLoader(false)
      }
    }
    getTitles(user, runCheck)
  }

  const fetchModule = (cat, callback) => {
    const runNext = (data) => {
      console.log('cat', cat);
      setModules({
        ...modules,
        [cat]: data
      })
      callback()
    }
    getModules(user, cat, runNext)
  }

  const iconStyles = {
    color: 'white',
    border: {
      backgroundColor: Colors.AmberRed,
      borderRadius: 50,
    }
  }

  return <ScrollView>
    <AwesomeAlert
      show={err?.val}
      showProgress={false}
      title={err.message || 'There is an error'}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={true}
      showCancelButton={true}
      showConfirmButton={false}
      cancelText="Close"
      cancelButtonColor="red"
      onCancelPressed={() => setErr({ val: false })}
    />
    <TimeTabs tabItems={times} length={0} iconStyles={iconStyles} shrink height={55}
      handleIconPress={() => navigation.navigate('Event', { event: null })}
      activeTab={activeTab} handleSetActive={(tab) => setActiveTab(tab)} />
    {activeTab === 'Today' && <Day navigation={navigation} events={events} showLoader={showLoader} />}
    {activeTab === 'Week' && <Week navigation={navigation} events={events} showLoader={showLoader} />}
    {activeTab === 'Month' && <Month navigation={navigation} events={events} showLoader={showLoader} />}
    {activeTab === 'Modules' && <Modules navigation={navigation} showLoader={showLoader} modules={modules}
      fetchModule={fetchModule} getTitles={getTitles} setShowLoader={setShowLoader} setShowMenu={setShowMenu}
      deepNav={deepNav} showMod={showMod} setDeepNav={setDeepNav} setShowMod={setShowMod}
      shallowNav={shallowNav} setShallowNav={setShallowNav}
    />}
  </ScrollView>
}