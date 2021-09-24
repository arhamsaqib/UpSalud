import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MyAppointmentsStack} from '../myAppointments/myAppointmentsStack';
import {AddAppointmentsStack} from '../addAppointments/addAppointmentsStack';
import {MedicalRecordsStack} from '../medicalRecords/medicalRecordsStack';
import {ChatStack} from '../chat/chatStack';
import {AccountStack} from '../account/accountStack';
import {HelpStack} from '../help/helpStack';
import {CustomDrawer} from './DrawerDesign';

const Drawer = createDrawerNavigator();

export const PatientDrawerNav = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="My Appointments" component={MyAppointmentsStack} />
      <Drawer.Screen name="Add Appointments" component={AddAppointmentsStack} />
      <Drawer.Screen name="Medical Records" component={MedicalRecordsStack} />
      <Drawer.Screen name="Chat" component={ChatStack} />
      <Drawer.Screen name="Account" component={AccountStack} />
      <Drawer.Screen name="Help" component={HelpStack} />
    </Drawer.Navigator>
  );
};
