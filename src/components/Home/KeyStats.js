import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { Table, TableWrapper, Row, Col, Cols } from 'react-native-table-component';
import { keyStatsData } from 'sm/utils/Constants';
import { windowWidth } from 'sm/utils/Dimensions';
import Divider from 'sm/components/Divider';

export default function KeyStats() {
  const { lastMatch, last5MatchAvg, last10MatchAvg } = keyStatsData;
  const getColor = (score, target) => score >= target ? 'green' : 'red';

  const GenText = (e, i) => <View style={{ paddingTop: 12, paddingRight: 15, }}>
    <Text style={{
      fontSize: Textsizes.xSmall,
      textAlign: 'center',
      color: getColor(e, keyStatsData.target[i])
    }}>
      {e}%
        </Text>
  </View>

  const items = [
    lastMatch.map(GenText),
    last5MatchAvg.map(GenText),
    last10MatchAvg.map(GenText)
  ]

  return <View style={styles.container}>
    <Text style={styles.headText}>Key Stats</Text>

    <View style={styles.tableWrap}>
      <Table>
        <Row data={keyStatsData.tableHead} style={styles.head} flexArr={[1, 1, 1.3, 1.3, 1.3]} textStyle={[styles.text, { fontSize: Textsizes.xSmall }]} />
        <TableWrapper style={styles.wrapper}>
          <Col data={keyStatsData.tableTitle} style={styles.title} heightArr={[28, 30, 30, 35, 35]} textStyle={styles.text} />
          <Col data={keyStatsData.target} style={{ flex: 0.25, justifyContent: 'center', paddingRight: 13 }} heightArr={[28, 30, 30, 35, 35]} textStyle={styles.text} />
          <TableWrapper style={{ flex: 1 }}>
            <Cols data={items} heightArr={[28, 30, 30, 35, 35]} textStyle={styles.text} />
          </TableWrapper>
          <View style={styles.divider} />
        </TableWrapper>
      </Table>
    </View>
    <Divider />

  </View>
};

const styles = StyleSheet.create({
  headText: {
    color: Colors.AmberRed,
    fontSize: 27,
    fontWeight: '700',
    margin: 10,
    marginLeft: 20
  },
  tableWrap: { marginBottom: 20, alignSelf: 'center',
    borderWidth: 1, borderColor: 'silver', borderRadius: 15, width: windowWidth * 0.9 },
  container: { flex: 1, backgroundColor: '#fff' },
  head: { height: 40, borderBottomColor: 'silver', borderBottomWidth: 1, padding: 3 },
  wrapper: { flexDirection: 'row' },
  title: { flex: 0.25, padding: 5 },
  row: { height: 28 },
  text: { textAlign: 'center', fontSize: Textsizes.xSmall },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    position: 'absolute',
    width: windowWidth * 0.9,
    top: '55%'
  }
})