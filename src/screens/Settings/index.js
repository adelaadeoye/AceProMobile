import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import Container from 'sm/components/Container';
import TopTabs from 'sm/components/TopTabs';
import { settingsTypes } from 'sm/utils/Constants';
import Profile from './components/Profile';
import Notifications from './components/Notification';
import Community from './components/Community';

export default function Settings({ navigation }) {
  const [activeScreen, setActiveScreen] = useState('');
  const [activeTab, setActiveTab] = useState('Profile');

  return <Container home={true} navigation={navigation} activeScreen={activeScreen}>
    <ScrollView>
      <TopTabs tabItems={settingsTypes} height={55} activeTab={activeTab}
        handleSetActive={(tab) => setActiveTab(tab)} Icon />
      {activeTab == 'Profile' && <Profile />}
      {activeTab == 'Notification' && <Notifications/>}
      {activeTab == 'Community' && <Community/>}
    </ScrollView>
  </Container>
};

