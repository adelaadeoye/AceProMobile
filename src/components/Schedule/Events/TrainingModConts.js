import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import IconBordered from 'sm/components/IconBordered';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import moment from 'moment';
import { scale, v_scale } from 'sm/utils/StylesConst';
import Icon from 'react-native-vector-icons/Feather';
import Input from 'sm/components/FormInput';

export default function ({ addedMods, handleTogglDrop, handleRemoveMod,
  handleCollpAll, handleShowAddMod, disabled, setAddedMods, writeStat, eventDesc }) {
  const { mods, togglState } = addedMods;

  const handleAddUnits = (val, type, title) => {
    if (isNaN(val)) {
      return;
    }
    const [mod] = mods.filter(e => e.title === title);
    mod.metrics = mod.metrics.map(e => {
      if (e.title === type) {
        return { ...e, value: val }
      }
      return e
    });
    setAddedMods({ mods: [mod, ...mods.filter(e => e.title !== title)], ...addedMods })
  }

  const items = mods.map(e => {
    const { title, metrics } = e;
    const isOpenDrop = togglState.includes(title);

    return <View key={title} style={{ marginTop: v_scale(10) }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => handleTogglDrop(title)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={isOpenDrop ? 'chevron-down' : 'chevron-right'}
            size={30} color={Colors.AmberRed} />
          <Text style={styles.contText}>{title}</Text>
        </TouchableOpacity>
        {!eventDesc && <Icon name="trash" size={25} color={Colors.AmberRed}
          onPress={() => handleRemoveMod(title)} />}
      </View>
      {isOpenDrop && metrics.map(e => <View key={e.title} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: v_scale(10) }}>
        <Text style={{ fontSize: Textsizes.Regular, marginHorizontal: scale(38), width: scale(130) }}>{e.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {e.fixed ? <>
            <View style={{ width: scale(100), borderWidth: 0.5, borderColor: Colors.AmberRed }} />
            <View style={{ width: scale(7), height: v_scale(7), borderRadius: 50, backgroundColor: Colors.AmberRed }} />
            <Text style={{ marginLeft: scale(8), fontWeight: 'bold' }}>10</Text>
          </>
            : <>
              {(writeStat === 'new') ?
                <Text style={[styles.modValText, { paddingVertical: v_scale(8) }]}>{e.value}</Text>
                : <TextInput
                  style={[styles.modValText, { backgroundColor: '#fff' }, Platform.OS === 'ios' && { height: v_scale(40) }]}
                  value={e.value}
                  keyboardType="numeric"
                  required
                  onChangeText={(val) => handleAddUnits(val, e.title, title)}
                />}
              <Text style={{ marginLeft: scale(8), fontWeight: 'bold' }}>{e.unit}</Text>
            </>}
        </View>
      </View>)}
    </View>
  })

  const iconStyles = {
    color: 'white',
    border: {
      backgroundColor: Colors.AmberRed,
      borderRadius: 50,
    },
  }

  return <View style={styles.container}>
    <View style={[styles.topWrap, (writeStat === 'new') && { flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'flex-start' }]}>
      <Text style={styles.headText}>Training Modules</Text>
      <View style={[!!(writeStat !== 'new') ? styles.colpWrap : { alignItems: 'flex-start', marginLeft: scale(-15)}]}>
        {(writeStat !== 'new') && <TouchableOpacity style={styles.colpPress} onPress={handleCollpAll}>
          <Text style={styles.colpText}>{!!togglState.length ? 'Collapse All' : 'Expand All'}</Text>
        </TouchableOpacity>}
        <View style={{ width: scale(10) }} />
        {!eventDesc ? <IconBordered iconStyles={iconStyles}
          disabled={disabled}
          handleIconPress={handleShowAddMod} /> : <View />}
      </View>
    </View>
    {items}
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(15),
    paddingVertical: v_scale(9),
    backgroundColor: Colors.Pink,
    marginHorizontal: 4,
    paddingBottom: v_scale(30),
    minHeight: v_scale(200)
  },
  modValText: {
    width: scale(100),
    borderWidth: 1,
    paddingLeft: scale(7),
    borderColor: Colors.AmberRed,
    maxHeight: v_scale(40),
    borderRadius: 10
  },
  topWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  colpWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  colpText: {
    color: '#fff',
    fontSize: Textsizes.Medium
  },
  colpPress: {
    padding: scale(9),
    marginLeft: scale(10),
    backgroundColor: Colors.AmberRed,
    borderRadius: 15
  },
  headText: {
    fontWeight: 'bold',
    fontSize: Textsizes.Regular
  },
  iconWrap: {
    height: 40,
  },
  contText: {
    fontSize: Textsizes.xMedium,
    fontWeight: 'bold',
    padding: 7,
  }
})