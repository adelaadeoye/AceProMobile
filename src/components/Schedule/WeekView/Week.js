import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native';
import {v_scale, scale} from 'sm/utils/StylesConst';
import Loader from 'sm/components/Loader';
import WeekView from 'react-native-week-view';
import moment from 'moment';
import Textsizes from 'sm/utils/Textsizes';
import Colors from 'sm/utils/Colors';
import Modal from 'react-native-modal';

// const { LightPink, LightRed, Pink, Yellow, Violet, Orange, LightOrange, LightYellow } = Colors;

const genRand = () => Math.floor(Math.random() * 1000);
const colors = ['green', 'blue', 'red', 'violet'];

class Week extends React.Component {
  state = {
    // events: sampleEvents,
    // selectedDate: startofWeek(),
    modalVal: {val: false, event: {}},
  };

  formatEvent = () =>
    this.props.events.map((e, i) => ({
      id: genRand(),
      description: e.title,
      startDate: moment(e.start),
      endDate: moment(e.end),
      location: e.location,
      invitees: e.invitees,
      event_type: e.event_type,
      color: colors[(i % colors.length) + 1],
    }));

  onEventPress = ({
    description,
    startDate,
    endDate,
    location,
    invitees,
    event_type,
  }) => {
    this.setState({
      modalVal: {
        val: true,
        event: {
          title: description,
          start: startDate,
          end: endDate,
          location,
          invitees,
          event_type,
        },
      },
    });
  };

  onGridClick = (event, startHour, date) => {
    const {navigation} = this.props;
    navigation.navigate('Event', {event: null});
    // const dateStr = date.toISOString().split('T')[0];
    // Alert.alert(`Date: ${dateStr}\nStart hour: ${startHour}`);
  };
  startofWeek = () => {
    return moment(new Date()).startOf('week').weekday(1);
    // return beign.add('d', 1);
  };

  render() {
    const {
      modalVal: {val: modalVisible, event},
    } = this.state;
    let {events, showLoader} = this.props;
    events = this.formatEvent();
    return (
      <>
        {showLoader ? (
          <Loader />
        ) : (
          <>
            <Modal
              isVisible={modalVisible}
              backdropColor="#000"
              backdropOpacity={0.3}
              onBackdropPress={() =>
                this.setState({
                  modalVal: {modal: {val: false, event: {}}},
                })
              }>
              <View style={styles.modalCont}>
                <ScrollView style={{padding: 30}}>
                  <Text style={styles.modText}>Event Details</Text>
                  <View style={styles.infoPanel}>
                    <Text style={styles.infoText}>Title</Text>
                    <Text style={styles.infoText}>{event?.title}</Text>
                  </View>
                  <View style={styles.infoPanel}>
                    <Text style={styles.infoText}>Start</Text>
                    <Text style={styles.infoText}>
                      {moment(event?.start).format('llll')}
                    </Text>
                  </View>
                  <View style={styles.infoPanel}>
                    <Text style={styles.infoText}>End</Text>
                    <Text style={styles.infoText}>
                      {moment(event?.end).format('llll')}
                    </Text>
                  </View>
                  <View style={styles.infoPanel}>
                    <Text style={styles.infoText}>Location</Text>
                    <Text style={styles.infoText}>{event?.location}</Text>
                  </View>
                  <View style={styles.infoPanel}>
                    <Text style={styles.infoText}>Event Type</Text>
                    <Text style={styles.infoText}>{event?.event_type}</Text>
                  </View>
                  <Text style={styles.modText}>Invitees</Text>
                  {!!event?.invitees?.length < 1 ? (
                    <Text style={styles.infoText}>No invitees</Text>
                  ) : (
                    event?.invitees?.map((e,key) => (
                      <Text style={styles.infoText} key={key}>
                        {e.last_name} {e.first_name}
                      </Text>
                    ))
                  )}
                </ScrollView>
              </View>
            </Modal>
            <SafeAreaView style={styles.container}>
              <WeekView
                events={events}
                selectedDate={moment(new Date()).startOf('week').weekday(1)}
                numberOfDays={3}
                onEventPress={this.onEventPress}
                onGridClick={this.onGridClick}
                headerStyle={styles.header}
                headerTextStyle={styles.headerText}
                hourTextStyle={styles.hourText}
                eventContainerStyle={styles.eventContainer}
                formatDateHeader="MMM D"
                hoursInDisplay={12}
                startHour={0}
              />
            </SafeAreaView>
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: Colors.AmberRed,
    borderColor: '#fff',
  },
  headerText: {
    color: 'white',
  },
  hourText: {
    color: 'black',
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: 'black',
  },
  modalCont: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    minHeight: v_scale(300),
    width: scale(300),
  },
  modText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    textAlign: 'center',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  infoPanel: {
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginVertical: 7,
    padding: 10,
    backgroundColor: Colors.LightAsh,
  },
  infoText: {
    fontSize: Textsizes.Medium,
  },
});

export default Week;
