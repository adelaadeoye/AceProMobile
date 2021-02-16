import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '../../utils/Dimensions';
import TopNavbar from '../../components/TopNavbar';
import Container from 'sm/components/Container';
import CoachRequest from 'sm/components/TopTabs';
import { COACH_COLOR, graph3_title } from './utils/Constant'
import Graph1 from './components/Graph1';
import Graph2 from './components/Graph2';
import Graph3 from './components/Graph3';
import Graph4 from './components/Graph4';
import Graph5 from './components/Graph5';

export default function Performance({ navigation }) {
  const [activeScreen, setActiveScreen] = useState('Performance');
  const [activeTab, setActive] = useState("Technical")

  const getHeight3 = (val, totalHeight) => {
    var total_height = (val / 5) * (totalHeight - 50)
    return total_height
  }

  const requests = ['Technical', 'Tactical', 'Physical', 'Mental'];

  return (
    <Container home={true} navigation={navigation} activeScreen={activeScreen}>
      <ScrollView>
        <CoachRequest tabItems={requests} handleIconPress={() => { }} height={55}
          activeTab={activeTab} handleSetActive={(tab) => setActive(tab)} />
        <View style={styles.coach_score}>
          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#e35540', margin: 5, width: COACH_COLOR, height: COACH_COLOR, borderRadius: COACH_COLOR / 2 }} />
            <Text style={{ fontWeight: 'bold' }}>Coach Score</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#f0a69b', margin: 5, width: COACH_COLOR, height: COACH_COLOR, borderRadius: COACH_COLOR / 2 }} />
            <Text style={{ fontWeight: 'bold' }}>Athlete Score</Text>
          </View>
        </View>

        <Graph1 />
        <Text style={{ marginTop: 20, marginBottom: 5, fontWeight: 'bold', alignSelf: 'center' }}>Time Allocation(hr)</Text>

        <Graph2 />
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#e5604c', borderWidth: 1 }} />
            <Text style={{ fontSize: 7 }}>Serving</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#7e40e3', borderWidth: 1 }} />
            <Text style={{ fontSize: 7 }}>Returning</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#d640e3', borderWidth: 1 }} />
            <Text style={{ fontSize: 7 }}>Both Back</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#f3a7a7', borderWidth: 1 }} />
            <Text style={{ fontSize: 7 }}>At Net</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: graph3_title, height: graph3_title, marginHorizontal: 8, borderRadius: graph3_title / 2, borderColor: '#fad247', borderWidth: 1 }} />
            <Text style={{ fontSize: 7 }}>Opponent At Net</Text>
          </View>
        </View>

        <Graph3 />
        <View style={{ alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row', marginVertical: 10, marginTop: 50, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#e35540', margin: 5, width: COACH_COLOR, height: COACH_COLOR, borderRadius: COACH_COLOR / 2 }} />
            <Text style={{ fontWeight: 'bold' }}>Average Tournament matches per year</Text>
          </View>
        </View>

        <Graph4 />
        <View style={{ alignSelf: 'center', marginTop: 50, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#e35540', margin: 5, width: COACH_COLOR, height: COACH_COLOR, borderRadius: COACH_COLOR / 2 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 9 }}>Rest & Recovery (Days per week)</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <View style={{ backgroundColor: '#9a12b3', margin: 5, width: COACH_COLOR, height: COACH_COLOR, borderRadius: COACH_COLOR / 2 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 9 }}>Rest & Recovery (Weeks per year)</Text>
          </View>
        </View>

        <Graph5 />
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  coach_score: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
