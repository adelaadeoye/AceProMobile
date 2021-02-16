import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from 'sm/utils/Colors';
import { goalTypes } from 'sm/utils/Constants';
import { windowHeight } from 'sm/utils/Dimensions';
import GoalType from './GoalType';

export default function GoalsTab({ handleSetActive, activeTab, height }) {
  const tabs = goalTypes.map(goal => (
    <GoalType key={goal}
      handleSetGoal={() => handleSetActive(goal)}
      goal={activeTab}
      title={goal} />
  ));

  return <ScrollView contentContainerStyle={{height: height || windowHeight * 0.15}}
    horizontal={true}>
    {tabs}
    <TouchableOpacity style={styles.icon}>
      <Icon name="plus" size={30} color={Colors.AmberRed} />
    </TouchableOpacity>
  </ScrollView>
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 50,
  }
})