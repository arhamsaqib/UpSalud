import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {COLORS} from '../../../colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomDrawer} from '../../patient/drawerNav/DrawerDesign';
import {AllAppointmentsDoctorStack} from '../allAppointments/allAppointmentsDoctorStack';
import {HomeStackDoctor} from '../home/homeStackDoctor';

const Drawer = createDrawerNavigator();

export const DoctorDrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: COLORS.light_blue,
        labelStyle: {color: 'black', letterSpacing: -1},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeStackDoctor}
        options={{
          drawerIcon: ({}) => (
            <Icon name="home-outline" size={18} color={COLORS.dark_blue} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="All Appointments"
        component={AllAppointmentsDoctorStack}
        options={{
          drawerIcon: ({}) => (
            <Icon name="calendar-outline" size={18} color={COLORS.dark_blue} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};
