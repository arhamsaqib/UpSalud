import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {MyAppointmentsStack} from '../myAppointments/myAppointmentsStack';
import {AddAppointmentsStack} from '../addAppointments/addAppointmentsStack';
import {MedicalRecordsStack} from '../medicalRecords/medicalRecordsStack';
import {ChatStack} from '../chat/chatStack';
import {AccountStack} from '../account/accountStack';
import {HelpStack} from '../help/helpStack';
import {CustomDrawer} from './DrawerDesign';
import {COLORS} from '../../../colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {PaymentStack} from '../../doctor/payment/paymentStack';

const Drawer = createDrawerNavigator();

export const PatientDrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: COLORS.light_blue,
        labelStyle: {color: 'black', letterSpacing: -1},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="My Appointments"
        component={MyAppointmentsStack}
        options={{
          drawerIcon: ({}) => (
            <Icon name="calendar-outline" size={18} color={COLORS.dark_blue} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Add Appointments"
        component={AddAppointmentsStack}
        options={{
          drawerIcon: ({}) => (
            <Icon
              name="add-circle-outline"
              size={18}
              color={COLORS.dark_blue}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Medical Records"
        component={MedicalRecordsStack}
        options={{
          drawerIcon: ({}) => (
            <Icon name="reader-outline" size={18} color={COLORS.dark_blue} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatStack}
        options={{
          drawerIcon: ({}) => (
            <Icon
              name="chatbubbles-outline"
              size={18}
              color={COLORS.dark_blue}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
        options={{
          drawerIcon: ({}) => (
            <Icon
              name="person-circle-outline"
              size={18}
              color={COLORS.dark_blue}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpStack}
        options={{
          drawerIcon: ({}) => (
            <Icon
              name="information-circle-outline"
              size={18}
              color={COLORS.dark_blue}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="Payment"
        component={PaymentStack}
        options={{
          drawerIcon: ({}) => (
            <Icon name="card-outline" size={18} color={COLORS.dark_blue} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};
