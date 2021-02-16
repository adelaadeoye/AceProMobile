import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {scale, v_scale} from 'sm/utils/StylesConst';
import Colors from 'sm/utils/Colors';
import Textsizes from 'sm/utils/Textsizes';
import Icon from 'react-native-vector-icons/AntDesign';
import tech from 'sm/assets/mod05.png';
import tact from 'sm/assets/mod01.png';
import phy from 'sm/assets/mod02.png';
import ment from 'sm/assets/mod03.png';
import outc from 'sm/assets/mod04.png';
import addCus from 'sm/assets/mod06.png';
import RowItem from './rowItem';
import TabItem from './tabItem';
import Input from 'sm/components/FormInput';
import {validateText} from 'sm/utils/Helpers';
import Loader from 'sm/components/Loader';

const catImgs = {
  Technical: tech,
  Tactical: tact,
  Physical: phy,
  Mental: ment,
  Outcomes: outc,
};

export default function CatTabs({
  setShowMod,
  shouldAddNew,
  modules,
  fetchModule,
  deepNav,
  setDeepNav,
  shallowNav,
  setShallowNav,
}) {
  const [inputs, setInputs] = useState({
    category: {value: '', isValid: null},
    subcategory: {value: '', isValid: null},
  });
  const [showLoader, setShowLoader] = useState(false);

  const {category, subcategory} = inputs;

  const validate = (val, name) =>
    setInputs({
      ...inputs,
      [name]: {
        ...inputs[name],
        value: val,
        isValid: validateText(val),
      },
    });

  const runFetchMod = (subCat) => {
    const {cat} = deepNav;
    setShowLoader(true);
    setDeepNav({...deepNav, subCat});
    return fetchModule(cat, () => {
      setShowLoader(false);
    });
  };

  if (shallowNav?.cat) {
    const {cat} = shallowNav;
    console.log('shallowNav', cat);
    return showLoader ? (
      <Loader />
    ) : (
      <ScrollView contentContainerStyle={styles.cont}>
        <View style={[styles.headNav, {justifyContent: 'space-between'}]}>
          <Icon
            name="left"
            color={Colors.AmberRed}
            onPress={() => setShallowNav({})}
            size={30}
            style={{marginLeft: scale(20)}}
          />
          <Text style={[styles.navText, {marginLeft: scale(-20)}]}>
            {shallowNav.cat}
          </Text>
          <View />
        </View>
        <Text
          style={[styles.navText, {color: '#000', marginBottom: v_scale(20)}]}>
          Select Module
        </Text>
        {(modules[cat] || []).map((e) => (
          <TabItem
            key={e.title}
            text={e.title}
            handlePress={(val) => {
              setShowMod(true, val);
            }}
            pickedMod={modules[cat][0].title}
          />
        ))}
        <Text
          style={{
            color: Colors.AmberRed,
            fontSize: Textsizes.xMedium,
            padding: scale(13),
            marginLeft: scale(12),
          }}
          onPress={() => {
            shouldAddNew();
            setShowMod(true, '');
            console.log('touched!!!!!!');
          }}>
          Create Custom Module...
        </Text>
      </ScrollView>
    );
  }

  if (deepNav?.subCat === 'Add Custom Subcategory') {
    return (
      <ScrollView style={styles.cont}>
        <View style={styles.headNav}>
          <Icon
            name="left"
            color={Colors.AmberRed}
            onPress={() => setDeepNav({...deepNav, subCat: null})}
            size={30}
            style={styles.icon}
          />
          <View style={{width: '63%'}}>
            <Input
              placeholder="Subcategory Name"
              placeholderTextColor={Colors.AmberRed}
              value={subcategory.value}
              widthFull
              required
              isValid={subcategory.isValid}
              onBlur={() => validate(subcategory.value, 'subcategory')}
              onChangeText={(val) => validate(val, 'subcategory')}
            />
          </View>
          <Icon
            name="check"
            color={Colors.AmberRed}
            onPress={() => setDeepNav({...deepNav, subCat: null})}
            size={30}
            style={styles.icon2}
          />
        </View>
        <View style={styles.wrapper}>
          <View style={[styles.row, {position: 'relative', left: scale(-90)}]}>
            <RowItem
              src={addCus}
              text="Add Custom Module"
              handlePress={() => {
                console.log('touched');
                shouldAddNew();
                setShowMod(true, '');
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  if (deepNav?.cat === 'Add Custom Category') {
    return (
      <ScrollView style={styles.cont}>
        <View style={styles.headNav}>
          <Icon
            name="left"
            color={Colors.AmberRed}
            onPress={() => setDeepNav({...deepNav, cat: null})}
            size={30}
            style={styles.icon}
          />
          <View style={{width: '63%'}}>
            <Input
              placeholder="Category Name"
              placeholderTextColor={Colors.AmberRed}
              value={category.value}
              required
              widthFull
              isValid={category.isValid}
              onBlur={() => validate(category.value, 'category')}
              onChangeText={(val) => validate(val, 'category')}
            />
          </View>
          <Icon
            name="check"
            color={Colors.AmberRed}
            onPress={() => {
              setDeepNav({...deepNav, cat: null});
            }}
            size={30}
            style={styles.icon2}
          />
        </View>
        <View style={styles.wrapper}>
          <View style={[styles.row, {position: 'relative', left: scale(-90)}]}>
            <RowItem
              src={addCus}
              text="Add Custom Subcategory"
              handlePress={() =>
                setDeepNav({...deepNav, subCat: 'Add Custom Subcategory'})
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  if (deepNav?.subCat) {
    const {cat, subCat} = deepNav;

    return showLoader ? (
      <Loader />
    ) : (
      <ScrollView contentContainerStyle={styles.cont}>
        <View style={[styles.headNav, {justifyContent: 'space-between'}]}>
          <Icon
            name="left"
            color={Colors.AmberRed}
            onPress={() => setDeepNav({...deepNav, subCat: null})}
            size={30}
            style={{marginLeft: scale(20)}}
          />
          <Text style={[styles.navText, {paddingRight: scale(40)}]}>
            {deepNav.subCat}
          </Text>
          <View />
        </View>
        <Text
          style={[styles.navText, {color: '#000', marginBottom: v_scale(20)}]}>
          Select Module
        </Text>
        {modules[cat][subCat].map((e) => (
          <TabItem
            key={e.title}
            text={e.title}
            handlePress={(val) => {
              console.log('val', val);
              setShowMod(true, val);
            }}
            pickedMod={modules[cat][subCat][0].title}
          />
        ))}
        <Text
          style={{
            color: Colors.AmberRed,
            fontSize: Textsizes.xMedium,
            padding: 15,
            marginLeft: scale(12),
          }}
          onPress={() => {
            shouldAddNew();
            setShowMod(true, '');
          }}>
          Create Custom Module...
        </Text>
      </ScrollView>
    );
  }

  if (deepNav?.cat) {
    const {titles} = modules;
    const subCatTitles = titles[deepNav.cat];
    const leftWing = subCatTitles.slice(
      0,
      Math.floor(subCatTitles.length / 2) + 1,
    );
    const rightWing = subCatTitles.slice(Math.ceil(subCatTitles.length / 2));

    return (
      <ScrollView contentContainerStyle={styles.cont}>
        <View style={[styles.headNav, {justifyContent: 'space-around'}]}>
          <Icon
            name="left"
            color={Colors.AmberRed}
            onPress={() => setDeepNav({})}
            size={30}
            style={[styles.icon, {left: scale(-35)}]}
          />
          <Text
            style={[styles.navText, {position: 'relative', left: scale(-80)}]}>
            {deepNav.cat}
          </Text>
        </View>
        <Text style={[styles.navText, {color: '#000'}]}>
          {' '}
          Select Subcategory
        </Text>
        <View style={styles.wrapper}>
          <View style={styles.row}>
            {leftWing.map((e) => (
              <RowItem key={e} text={e} handlePress={() => runFetchMod(e)} />
            ))}
          </View>
          <View style={styles.row}>
            {rightWing.map((e) => (
              <RowItem key={e} text={e} handlePress={() => runFetchMod(e)} />
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  const handleDeepNav = (cat) => {
    const exceptions = ['Physical', 'Mental', 'Outcomes'];
    if (exceptions.includes(cat)) {
      console.log('touched!!!!!');
      setShowLoader(true);
      setShallowNav({cat});
      return fetchModule(cat, () => {
        setShowLoader(false);
      });
    }
    setDeepNav({cat});
  };

  const {titles} = modules;
  const catTitles = Object.keys(titles);
  const defTitles = ['Technical', 'Physical', 'Outcomes', 'Tactical', 'Mental'];
  const addTitles = catTitles.filter((e) => !defTitles.includes(e));
  const newTitles = [...defTitles, ...addTitles];
  const leftWing = newTitles.slice(0, Math.floor(catTitles.length / 2) + 1);
  const rightWing = newTitles.slice(Math.ceil(catTitles.length / 2));

  return (
    <ScrollView contentContainerStyle={[styles.cont, {marginTop: v_scale(50)}]}>
      <Text style={[styles.navText, {color: '#000'}]}>Select Category</Text>
      <View style={styles.wrapper}>
        <View style={styles.row}>
          {leftWing.map((e) => (
            <RowItem
              key={e}
              src={catImgs[e]}
              text={e}
              handlePress={() => handleDeepNav(e)}
            />
          ))}
        </View>
        <View style={styles.row}>
          {rightWing.map((e) => (
            <RowItem
              key={e}
              src={catImgs[e]}
              text={e}
              handlePress={() => handleDeepNav(e)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    minHeight: v_scale(500),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: v_scale(20),
  },
  row: {
    marginHorizontal: scale(20),
    justifyContent: 'space-around',
  },
  headNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: v_scale(10),
  },
  navText: {
    color: Colors.AmberRed,
    fontSize: Textsizes.Large,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: v_scale(5),
  },
  icon: {
    position: 'relative',
    left: scale(-25),
  },
  icon2: {
    position: 'relative',
    right: scale(-25),
  },
});
