import React from 'react';
import {View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import IconBordered from './IconBordered';
import Colors from 'sm/utils/Colors';
import {windowWidth, windowHeight} from 'sm/utils/Dimensions';
import Tab from './Tab';

export default function TopTabs({
  handleSetActive,
  activeTab,
  isIconPresent,
  searchPresent,
  iconStyles,
  height,
  tabItems,
  Icon,
  shrink,
  handleIconPress,
  length,
}) {
  const tabs = tabItems.map((goal) => (
    <Tab
      key={goal}
      shrink
      isIconPresent={isIconPresent}
      iconName={goal}
      isActive={goal === activeTab}
      length={length || tabItems.length}
      handleSetGoal={() => handleSetActive(goal)}
      searchPresent={searchPresent}
      goal={activeTab}
      title={goal}
    />
  ));

  return (
    <>
      <ScrollView
        contentContainerStyle={{height: height || windowHeight * 0.15}}
        horizontal={true}>
        {tabs}
      </ScrollView>
      <View style={{width:"100%", alignItems:"flex-end"}}>
    
        {Icon ? (
          Icon
        ) : (
          <IconBordered
            shrink={shrink}
            handleIconPress={handleIconPress}
            iconStyles={{...iconStyles}}
          />
        )}
      </View>
    </>
  );
}

TopTabs.defaultProps = {
  iconStyles: {
    color: Colors.AmberRed,
    border: {},
  },
};
