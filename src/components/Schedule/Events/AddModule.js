import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Colors from 'sm/utils/Colors';
import InnerModal from 'sm/components/InnerModal';
import TopModal from 'sm/components/TopModal';
// import ModCont from './ModCont';
import CatTabs from 'sm/screens/Training/components/catTabs';
import ModDescEvent from './ModDescEvent';
import Textsizes from 'sm/utils/Textsizes';
import ModulesScreen from 'sm/screens/Training/ModulesScreen';

export default function ({
  handleAddMod, showMod, setShowMod, goBackToEvt, setShallowNav, shallowNav, setShowMenu,
  modules, fetchModule, deepNav, setDeepNav, showLoader, setShowLoader
}) {

  return <View>
    <InnerModal topModal={<TopModal leftText={<Text onPress={goBackToEvt}
      style={{ color: Colors.Orange, fontSize: Textsizes.Medium }}>Cancel</Text>}
      midText={<Text>Add Module To Event</Text>}
      rightText={<Text style={{ flexGrow: 0.1 }} />} />}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <ModulesScreen modules={modules} showLoader={showLoader} setShowLoader={setShowLoader}
          fetchModule={fetchModule} deepNav={deepNav} showMod={showMod} onEvent
          setDeepNav={setDeepNav} setShowMod={setShowMod} setShowMenu={setShowMenu}
          shallowNav={shallowNav} setShallowNav={setShallowNav} handleAddMod={handleAddMod} />
      </ScrollView>
    </InnerModal>
  </View>
}