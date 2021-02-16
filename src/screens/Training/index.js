import React, { useState } from 'react'
import Schedule from './ScheduleScreen';
import Container from 'sm/components/Container';

export default function Training({ navigation }) {
  const [activeScreen, setActiveScreen] = useState('Training');
  const [showMenu, setShowMenu] = useState(true);

  return <Container home={true} navigation={navigation} showMenu={showMenu} activeScreen={activeScreen}>
    <Schedule navigation={navigation} setShowMenu={setShowMenu} />
  </Container>
}

