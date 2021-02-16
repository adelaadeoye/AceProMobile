import React, {useState, useContext} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TopNavbar from 'sm/components/TopNavbar';
import {validateText} from 'sm/utils/Helpers';
import InnerModal from 'sm/components/InnerModal';
import TopModal from 'sm/components/TopModal';
import {
  AddEvent,
  AddModule,
  RepeatCont,
  EventDesc,
} from 'sm/components/Schedule';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import Container from 'sm/components/Container';
import {AuthContext} from 'sm/navigation/AuthProvider';
import {saveEvent, updateEvent, getUsers} from './utils/fb-saveEvents';
import {useFocusEffect} from '@react-navigation/native';
import useStateWithCallback from 'sm/utils/Helpers';
import moment from 'moment';
import {getModules, getTitles, loadDefaults} from './utils/fb-modulesHandler';

const initialFormState = {
  title: {
    value: '',
    isValid: null,
  },
  location: {
    value: '',
    isValid: true,
  },
  eventType: {
    value: 'Private Lesson',
    isValid: true,
  },
};

export default function Event({navigation, route}) {
  const {user} = useContext(AuthContext);

  const [activeScreen, setActiveScreen] = useState('Training');
  const [showSaveLoading, setShowSaveLoading] = useState(false);
  const [showRepeat, setshowRepeat] = useState(false);
  const [showAddMod, setShowAddMod] = useState(false);
  const [repeat, setRepeat] = useState('Never');
  const [showMod, setShowMod] = useState({show: false, name: ''});
  const [startDate, setStartDate] = useState(moment().format('L'), () => {
    validateMaxTime();
  });
  const [startTime, setStartTime] = useState(moment().format('LTS'));
  const [endDate, setEndDate] = useState(moment().format('L'));
  const [endTime, setEndTime] = useStateWithCallback(
    moment().add(1, 'hours').format('LTS'),
    () => {
      validateMaxTime();
    },
  );
  const [err, setErr] = useState({val: false});
  const [form, setForm] = useState(initialFormState);
  const [addedMods, setAddedMods] = useState({
    mods: [],
    togglState: [],
  });
  const [deepNav, setDeepNav] = useState({});
  const [modules, setModules] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [shallowNav, setShallowNav] = useState({});
  const [showMenu, setShowMenu] = useState(true);
  const [writeStat, setWriteStat] = useState('new');
  const [inviteesPool, setInviteesPool] = useState([]);
  const [invitees, setInvitees] = useState(['None']);

  useFocusEffect(
    React.useCallback(() => {
      fetchModTitles();

      return () => {
        initializeState();
      };
    }, []),
  );

  const initializeState = () => {
    setErr({val: false});
    setForm(initialFormState);
    setShowSaveLoading(false);
    setshowRepeat(false);
    setRepeat('Never');
    setShowMod({show: false});
    setShowAddMod(false);
    setStartDate(moment().format('L'));
    setStartTime(moment().format('LTS'));
    setEndDate(moment().format('L'));
    setEndTime(moment().add(1, 'hours').format('LTS'));
    setAddedMods({mods: [], togglState: []});
    setWriteStat('new');
    setDeepNav({});
    setShallowNav({});
    setInvitees(['None']);
    setInviteesPool([]);
  };

  const event = route?.params?.event;

  const handleStartEdit = () => {
    const {
      title,
      event_type,
      start_date,
      end_date,
      invitees,
      location,
      modules,
      repeat,
    } = event;
    setWriteStat('edit');
    setForm({
      title: {
        value: title,
        isValid: true,
      },
      location: {
        value: location,
        isValid: true,
      },
      eventType: {
        value: event_type,
        isValid: true,
      },
    });
    setInviteesPool(['None', invitees]);
    setStartDate(moment(start_date).format('L'));
    setStartTime(moment(start_date).format('LT'));
    setEndDate(moment(end_date).format('L'));
    setEndTime(moment(end_date).format('LT'));
    setAddedMods({
      mods: modules,
      togglState: [],
    });
    setRepeat(repeat);
  };

  if (event && writeStat === 'new') {
    handleStartEdit();
  }

  const handleSetRepeat = (repeat) => {
    setshowRepeat(false);
    setRepeat(repeat);
  };

  const handleExitScreen = () => {
    initializeState();
    navigation.navigate('Training');
  };

  const validate = (val, name, mode) => {
    if (name === 'starts') {
      if (mode === 'time') {
        return setStartTime(val);
      }
      return setStartDate(val);
    } else if (name === 'ends') {
      if (mode === 'time') {
        return setEndTime(val);
      }
      return setEndDate(val);
    }
    // console.log('nooo');
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value: val,
        isValid: validateText(val, 40, 'symbol'),
      },
    });
  };

  const validateMaxTime = () => {
    if (
      endTime &&
      new Date(`${startDate} ${startTime}`) >= new Date(`${endDate} ${endTime}`)
    ) {
      setEndDate('');
      setEndTime('');
      setErr({
        val: true,
        message:
          'Please set an end time period to be more than start time period!',
      });
    }
  };

  const checkFullValidate = () =>
    new Promise((resolve, reject) => {
      const {title, location} = form;
      setForm({
        ...form,
        title: {
          value: title.value,
          isValid: title.isValid === true,
        },
        location: {
          value: location.value,
          isValid: location.isValid === true,
        },
      });
      setTimeout(() => {
        console.log(
          'validate',
          title.isValid &&
            location.isValid &&
            !!startDate &&
            !!startTime &&
            !!endDate &&
            !!endTime,
        );
        title.isValid &&
        location.isValid &&
        !!startDate &&
        !!startTime &&
        !!endDate &&
        !!endTime
          ? resolve(true)
          : reject(false);
      }, 0);
    });

  const handleSaveEvent = () => {
    setShowSaveLoading(true);
    const filtInvitees = invitees.includes('None') ? [] : invitees;
    const runNext = (eventDetails) => {
      const {email, first_name = '', last_name = '', last_login = ''} = user;
      // const { created_at } = eventDetails;
      filtInvitees.forEach((e) => {
        saveEvent(e, {
          ...eventDetails,
          isInVited: true,
          created_by: {email, first_name, last_name, last_login},
        });
      });
      handleExitScreen();
    };

    checkFullValidate()
      .then(() => {
        const {title, location, eventType} = form;

        const time = moment().format();
        let timeline = {
          created_at: time,
          updated_at: time,
        };

        if (writeStat === 'edit')
          timeline = {
            created_at: event.created_at,
            updated_at: moment().format(),
          };

        let eventDetails = {
          title: title.value,
          location: location.value,
          event_type: eventType.value,
          invitees: filtInvitees,
          start_date: `${startDate} ${startTime}`,
          end_date: `${endDate} ${endTime}`,
          repeat,
          modules: addedMods.mods,
          created_at: timeline.created_at,
          updated_at: timeline.updated_at,
        };
        // alert(JSON.stringify(eventDetails, null, 2))
        saveEvent(user, eventDetails, () => runNext(eventDetails));
      })
      .catch((e) => {
        console.log('caught-event-creation', e.message);
        setShowSaveLoading(false);
        setErr({val: true});
      });
  };

  const fetchModTitles = async () => {
    setShowLoader(true);
    const runNext = (data) => {
      setModules({
        ...modules,
        titles: data,
      });
      setShowLoader(false);
    };

    const runCheck = (data) => {
      if (!data) {
        loadDefaults(user, runNext);
      } else {
        setModules({
          ...modules,
          titles: data,
        });
        setShowLoader(false);
      }
    };
    getTitles(user, runCheck);
    getUsers(user, (users) => setInviteesPool(['None', ...users]));
  };

  const fetchModule = (cat, callback) => {
    const runNext = (data) => {
      setModules({
        ...modules,
        [cat]: data,
      });
      callback();
    };
    getModules(user, cat, runNext);
  };

  const handleTogglDrop = (modTitle) => {
    const {togglState} = addedMods;
    if (!togglState.includes(modTitle)) {
      return setAddedMods({
        ...addedMods,
        togglState: [modTitle, ...togglState],
      });
    }
    setAddedMods({
      ...addedMods,
      togglState: togglState.filter((e) => e !== modTitle),
    });
  };

  const handleRemoveMod = (modTitle) => {
    const {mods, togglState} = addedMods;
    setAddedMods({
      togglState: togglState.filter((e) => e.title !== modTitle),
      mods: mods.filter((e) => e.title !== modTitle),
    });
  };

  const handleCollpAll = () => {
    const {togglState, mods} = addedMods;
    if (!togglState.length) {
      return setAddedMods({
        ...addedMods,
        togglState: mods.map((e) => e.title),
      });
    }
    setAddedMods({
      ...addedMods,
      togglState: [],
    });
  };

  const handleAddMod = (mod) => {
    const {mods} = addedMods;
    if (!mods.some((e) => e.title === mod.title))
      setAddedMods({
        ...addedMods,
        mods: [mod, ...mods],
      });
    setShowMod({});
    setShowAddMod(false);
    setDeepNav({});
    setShallowNav({});
  };

  const handleAddInvitee = (user) => {
    if (user === 'None') {
      return setInvitees([user]);
    }
    if (!invitees.includes(user)) {
      setInvitees([user, ...invitees.filter((e) => e !== 'None')]);
    } else {
      setInvitees(invitees.filter((e) => e.email !== user.email));
    }
  };

  const leftModRepeatText = (
    <Text
      style={{color: Colors.Orange, fontSize: Textsizes.Medium}}
      onPress={() => setshowRepeat(false)}>
      {'<  New Event'}
    </Text>
  );
  const midModRepeatText = (
    <Text style={{fontSize: Textsizes.Medium}}>Repeat</Text>
  );

  const leftText = (
    <TouchableOpacity style={{flexDirection: 'row'}} onPress={handleExitScreen}>
      <Text style={{color: Colors.Orange, fontSize: Textsizes.Medium}}>
        Cancel
      </Text>
    </TouchableOpacity>
  );

  const rightText = (
    <TouchableOpacity
      style={{flexDirection: 'row'}}
      onPress={handleSaveEvent}
      disabled={showSaveLoading}>
      <Text style={{color: 'gray', fontSize: Textsizes.Medium}}>
        {event ? 'Save' : 'Add'}
      </Text>
      {showSaveLoading && <ActivityIndicator color="grey" />}
    </TouchableOpacity>
  );

  return (
    <Container
      home={true}
      navigation={navigation}
      showMenu={showMenu}
      activeScreen={activeScreen}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        {showRepeat ? (
          <InnerModal
            topModal={
              <TopModal
                leftText={leftModRepeatText}
                midText={midModRepeatText}
                rightText={<Text style={{flexGrow: 0.35}} />}
              />
            }>
            <RepeatCont repeat={repeat} handleSetRepeat={handleSetRepeat} />
          </InnerModal>
        ) : (
          <InnerModal
            topModal={
              <TopModal
                leftText={leftText}
                midText={
                  <Text
                    style={{fontWeight: 'bold', fontSize: Textsizes.Regular}}>
                    {event ? 'Edit Event' : 'New Event'}
                  </Text>
                }
                rightText={rightText}
              />
            }>
            {showAddMod ? (
              <AddModule
                goBackToEvt={() => setShowAddMod(false)}
                handleAddMod={handleAddMod}
                setShowMod={setShowMod}
                showLoader={showLoader}
                setShowLoader={setShowLoader}
                shallowNav={shallowNav}
                setShallowNav={setShallowNav}
                modules={modules}
                fetchModule={fetchModule}
                deepNav={deepNav}
                showMod={showMod}
                setDeepNav={setDeepNav}
                setShowMenu={setShowMenu}
              />
            ) : (
              <AddEvent
                repeat={repeat}
                form={form}
                startDate={startDate}
                setStartDate={setStartDate}
                startTime={startTime}
                setStartTime={setStartTime}
                endDate={endDate}
                setEndDate={setEndDate}
                endTime={endTime}
                setEndTime={setEndTime}
                validate={validate}
                err={err}
                setErr={setErr}
                setAddedMods={setAddedMods}
                addedMods={addedMods}
                writeStat={writeStat}
                handleTogglDrop={handleTogglDrop}
                handleCollpAll={handleCollpAll}
                handleRemoveMod={handleRemoveMod}
                handleSetRepeat={handleSetRepeat}
                handleShowAddMod={() => setShowAddMod(true)}
                handleShowRepeat={() => setshowRepeat(true)}
                inviteesPool={inviteesPool}
                invitees={invitees}
                setInvitees={handleAddInvitee}
              />
            )}
          </InnerModal>
        )}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  headText: {},
  button: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Medium,
  },
});
