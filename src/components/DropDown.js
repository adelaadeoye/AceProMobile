import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import { windowWidth } from 'sm/utils/Dimensions';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import { v_scale } from 'sm/utils/StylesConst';
import useStateWithCallback from 'sm/utils/Helpers';

const { LightAsh, AmberRed } = Colors;

const Dropdown = ({ handleChange, goalType, dropDownItems = [], dropWidth, margin, mod, withIcons, position, colorMode, withImgs, imgs }) => {
  const [isActive, setIsActive] = useStateWithCallback(false, () => toggleHeight());
  const [dropHeight, setDropHeight] = useState(v_scale(70));

  const backgroundColor = (goal) => goalType == goal && AmberRed || LightAsh;
  const color = (goal) => goalType == goal && '#fff' || '#000';

  const selectText = (goal) => {
    setIsActive(!isActive)
    handleChange(goal);
  }

  const openPanel = () => setIsActive(!isActive);

  const toggleHeight = () => {
    if (isActive) {
      return setDropHeight(v_scale(70 * dropDownItems.length))
    }
    setDropHeight(v_scale(70))
  }

  const Items = dropDownItems.map(goal => (<Text key={goal}
    onPress={() => selectText(goal)}
    style={[styles.innerText, { color: color(goal), backgroundColor: backgroundColor(goal) }]}>
    {goal}
  </Text>
  ));

  let IconItems;
  if (withIcons) IconItems = dropDownItems.map(e => (
    <View key={e} style={[styles.iconWrap, { backgroundColor: backgroundColor(e) }]}>
      <Text onPress={() => selectText(e)}
        style={[styles.innerText, {
          color: color(e), fontSize: Textsizes.Regular,
          backgroundColor: backgroundColor(e)
        }]}>
        {e.split(':')[0]}
      </Text>
      <Icon name={e.split(':')[1]} size={22} color={color(e)} />
    </View>
  ))

  let ImgItems;
  if (withImgs) ImgItems = dropDownItems.map(e => (
    <View key={e} style={[styles.iconWrap, { backgroundColor: backgroundColor(e) }]}>
      <Text onPress={() => selectText(e)}
        style={[styles.innerText, {
          color: color(e), fontSize: Textsizes.Regular,
          backgroundColor: backgroundColor(e)
        }]}>
        {e}
      </Text>
      <Image source={imgs[e]} resizeMode='contain' style={{}} />
    </View>
  ))

  let imgsDropType;
  if (withImgs) (imgsDropType = <View style={{ flex: 0.9, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row-reverse' }}>
    <Text style={[styles.dropFrameText, colorMode && { color: 'grey' }]}>{goalType}</Text>
    <Image source={imgs[goalType]} resizeMode='contain' style={{}} />
  </View>)

  let iconsDropType;
  if (withIcons) (iconsDropType = <View style={{ flex: 0.9, justifyContent: 'space-around', flexDirection: 'row-reverse' }}>
    <Text style={[styles.dropFrameText, colorMode && { color: 'grey' }]}>{goalType.split(':')[0]}</Text>
    <Icon name={goalType.split(':')[1]} size={22} color={colorMode && 'grey'} />
  </View>)

  const regularDropType = <React.Fragment>
    <Text style={styles.dropFrame}>
      {goalType}
    </Text>
  </React.Fragment>

  return <View style={[styles.mainWrapper, { height: dropHeight }, margin && { top: 0, marginTop: 0 }, mod && { top: 20 }, position && position]}>
    {isActive && <View style={[styles.dropTextContainer, colorMode && { borderColor: 'grey', borderRadius: 5 }, { width: windowWidth * dropWidth }, margin && { left: 20, top: 0 }, mod && { left: 0 }]}>
      {withIcons ? IconItems : withImgs ? ImgItems : Items}
    </View>}
    <TouchableOpacity onPress={openPanel}
      style={[styles.pickerSelect, { width: windowWidth * dropWidth }, margin && { margin: 0, marginHorizontal: 20 }, withIcons && { flex: 0, height: 55 }, colorMode && { borderRadius: 5}]}>
      <View style={[styles.select, colorMode && { borderColor: 'grey', borderRadius: 5 }, { width: windowWidth * dropWidth }]}>
        {withIcons ? iconsDropType : withImgs ? imgsDropType : regularDropType}
        {colorMode ? <Icon name="caret-down" size={20} color='grey' />
          : <Icon name="ios-chevron-down-sharp" size={27} color={AmberRed} />}
      </View>
    </TouchableOpacity>
  </View>
}

Dropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

const borderStyle = {
  borderWidth: 2,
  borderColor: AmberRed,
  borderRadius: 15,
}

const styles = StyleSheet.create({
  mainWrapper: {
    position: 'absolute',
    top: v_scale(-25),
    left: 0,
    zIndex: 50,
    marginTop: 30,
  },
  pickerSelect: {
    backgroundColor: LightAsh,
    borderRadius: 15,
  },
  select: {
    height: v_scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    ...borderStyle
  },
  dropFrame: {
    fontSize: Textsizes.Medium,
    textAlign: 'center',
    flex: 0.9
  },
  dropFrameText: {
    fontSize: Textsizes.Medium,
    textAlign: 'center',
  },
  innerText: {
    fontSize: Textsizes.Medium,
    textAlign: 'center',
    backgroundColor: LightAsh,
    zIndex: 20,
    paddingVertical: 5
  },
  dropTextContainer: {
    ...borderStyle,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
    backgroundColor: LightAsh,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'flex-start',
    position: 'absolute',
    top: v_scale(35),
    zIndex: 20
  },
  iconWrap: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    backgroundColor: LightAsh,
    zIndex: 20
  }
});

export default Dropdown;
