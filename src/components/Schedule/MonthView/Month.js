import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from 'react-native';
import { ExpandableCalendar, Timeline, CalendarProvider, Agenda } from 'react-native-calendars';
import { v_scale, scale } from 'sm/utils/StylesConst';
import Textsizes from 'sm/utils/Textsizes';
import Colors from 'sm/utils/Colors';
import moment from 'moment';
import Modal from 'react-native-modal';

// const EVENTS = [
//   {
//     start: '2020-09-06 22:30:00',
//     end: '2020-09-06 23:30:00',
//     title: 'Dr. Mariana Joseph',
//     summary: '3412 Piedmont Rd NE, GA 3032',
//     color: '#e6add8'
//   },
// ];

const genRand = () => Math.floor(Math.random() * 1000);
const colors = ['#e6bcad', '#d8ade6', '#e6add8', 'violet'];


export default class TimelineCalendarScreen extends Component {
  state = {
    currentDate: new Date().toDateString(),
    modalVal: { val: false, event: {} }
  };

  onDateChanged = date => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
    this.setState({ currentDate: date });
  };

  onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({ item }) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={'Info'} />
        </View>
      </TouchableOpacity>
    );
  };

  getTheme = () => {
    const themeColor = '#0059ff';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';

    return {
      // arrows
      arrowColor: black,
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 }
    };
  };

  formatEvent = () => this.props.events.map((e, i) => ({
    id: genRand(),
    title: e.title,
    start: moment(e.start).format(),
    end: moment(e.end).format(),
    summary: e.location,
    invitees: e.invitees,
    event_type: e.event_type,
    color: colors[i % colors.length + 1]
  }))

  onEventPress = ({ title, summary, start, end,
    invitees, event_type }) => {
    this.setState({
      modalVal: {
        val: true, event: {
          title,
          start,
          end,
          location: summary,
          invitees,
          event_type
        }
      }
    })
  };

  render() {
    const { modalVal: { val: modalVisible, event } } = this.state;

    return (
      <>
        <Modal
          isVisible={modalVisible}
          backdropColor='#000'
          backdropOpacity={0.3}
          onBackdropPress={() => this.setState({
            modalVal: { modal: { val: false, event: {} } }
          })} >
          <View style={styles.modalCont}>
            <ScrollView style={{ padding: 30 }}>
              <Text style={styles.modText}>Event Details</Text>
              <View style={styles.infoPanel}>
                <Text style={styles.infoText}>Title</Text>
                <Text style={styles.infoText}>{event?.title}</Text>
              </View>
              <View style={styles.infoPanel}>
                <Text style={styles.infoText}>Start</Text>
                <Text style={styles.infoText}>{moment(event?.start).format('llll')}</Text>
              </View>
              <View style={styles.infoPanel}>
                <Text style={styles.infoText}>End</Text>
                <Text style={styles.infoText}>{moment(event?.end).format('llll')}</Text>
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
              {!!event?.invitees?.length ? <Text style={styles.infoText}>No invitees</Text>
                : event?.invitees?.map(e => <Text style={styles.infoText}>{e}</Text>)}
            </ScrollView>
          </View>
        </Modal>
       
        <CalendarProvider
          // date={ITEMS[0].title}
          date={this.state.currentDate}
          onDateChanged={this.onDateChanged}
          onMonthChange={this.onMonthChange}
          theme={{ todayButtonTextColor: '#0059ff' }}
          showTodayButton
          disabledOpacity={0.6}
        // todayBottomMargin={16}
        >
          <ExpandableCalendar
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            initialPosition={ExpandableCalendar.positions.OPEN}
            firstDay={1}
            // markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
            // markedDates={() => {}} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
            theme={this.getTheme()}
            leftArrowImageSource={require('./assets/previous.png')}
            rightArrowImageSource={require('./assets/next.png')}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
          // disableWeekScroll
          />
          <Timeline
            format24h={false}
            eventTapped={this.onEventPress}
            events={this.formatEvent().filter(event => moment(event.start).isSame(this.state.currentDate, 'day'))}
          scrollToFirst={true}
          // start={0}
          // end={24}
          />
        </CalendarProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0'
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  },
  modalCont: {
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    minHeight: v_scale(300),
    width: scale(300)
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
    backgroundColor: Colors.LightAsh
  },
  infoText: {
    fontSize: Textsizes.Medium
  }
});