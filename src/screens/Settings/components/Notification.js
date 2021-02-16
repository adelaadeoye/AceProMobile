import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Col, Cols, Cell, Row, Rows } from 'react-native-table-component';
import { windowWidth, windowHeight } from 'sm/utils/Dimensions';
import Textsizes from 'sm/utils/Textsizes';
import CheckBox from './CheckBox';

export default function Notifications() {
  const initialState = ['InApp', 'Push', 'Email', 'SMS', 'Desktop'];

  const [eventReminders, setEventReminders] = useState(initialState);
  const [newAceproPosts, setNewAceproPosts] = useState(initialState);
  const [repliesToMyPosts, setRepliesToMyPosts] = useState(initialState);
  const [newTeamPosts, setNewTeamPosts] = useState(initialState);
  const [newSportsPost, setNewSportsPost] = useState(initialState);
  const [coachFeedback, setCoachFeedback] = useState(initialState);

  const setNotif = (value, setter, notifObj) => {
    alert(value)
    let eventRem;
    if (notifObj.includes(value)) {
      eventRem = notifObj.filter(e => e !== value)
    } else {
      eventRem = [...notifObj, value]
    }
    setter(eventRem)
  }

  const tableData = [
    initialState.map(value => CheckBox(eventReminders, setNotif, setEventReminders, value)),
    initialState.map(value => CheckBox(newAceproPosts, setNotif, setNewAceproPosts, value)),
    initialState.map(value => CheckBox(repliesToMyPosts, setNotif, setRepliesToMyPosts, value)),
    initialState.map(value => CheckBox(newTeamPosts, setNotif, setNewTeamPosts, value)),
    initialState.map(value => CheckBox(newSportsPost, setNotif, setNewSportsPost, value)),
    initialState.map(value => CheckBox(coachFeedback, setNotif, setCoachFeedback, value)),
  ]


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Table style={{ height: windowHeight * 0.55 }}>
        <Row data={['', ...initialState]} flexArr={[0.8, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.head} textStyle={styles.headRowText} />
        <TableWrapper style={styles.wrapper}>
          <Col data={['Event Reminders', 'New AcePro Posts', 'Replies to my Posts', 'New Team Posts', 'New Sports Post', 'Coach Feedback']} flexArr={[2, 2, 2, 2, 2, 2]} style={styles.col} heightArr={[50, 50, 50, 50, 50, 50]} textStyle={styles.titleText} />
          <Rows data={tableData} flexArr={[0.5, 0.5, 0.5, 0.5, 0.5, 0.5]} style={styles.row} heightArr={[50, 50, 50, 50, 50, 50]} textStyle={styles.rowText} />
        </TableWrapper>
      </Table>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  wrapper: { flexDirection: 'row' },
  row: {},
  col: { height: 40 },
  title: { alignItems: 'center' },
  rowText: { height: 50, textAlign: 'center', fontSize: Textsizes.Small },
  headRowText: { textAlign: 'center', fontSize: Textsizes.Small },
  titleText: { textAlign: 'center', fontSize: Textsizes.Small }
});