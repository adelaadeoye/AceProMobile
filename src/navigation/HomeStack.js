import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import GoalScreen from '../screens/GoalScreen';
import TrainingScreen from 'sm/screens/Training';
import EventScreen from 'sm/screens/Training/EventsScreen';
import TournamentsScreen from 'sm/screens/TournamentsScreen';
import SocialScreen from 'sm/screens/SocialScreen';
import SettingsScreen from 'sm/screens/Settings';
import NewsScreen from 'sm/screens/News';
import DrawerNav from './DrawerNav';
import AlertsScreen from 'sm/screens/Alerts';
import PerformanceScreen from 'sm/screens/Performance';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator drawerStyle={{width: 0}}
      initialRouteName="Home"
      drawerContent={(props) => <DrawerNav {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Goals" component={GoalScreen} />
      <Drawer.Screen name="Training" component={TrainingScreen} />
      <Drawer.Screen name="Event" component={EventScreen} />
      <Drawer.Screen name="Tournaments" component={TournamentsScreen} />
      <Drawer.Screen name="Social" component={SocialScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Alerts" component={AlertsScreen}/>
      <Drawer.Screen name="News" component={NewsScreen}/>
      <Drawer.Screen name="Performance" component={PerformanceScreen}/>
    </Drawer.Navigator>
  );
}
