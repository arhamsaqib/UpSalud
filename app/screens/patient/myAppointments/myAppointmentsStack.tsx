import React from 'react';
import {MyAppointments} from './myAppointments';

import {createStackNavigator} from '@react-navigation/stack';
import {fChat} from '../../chat/fchat';
const Stack = createStackNavigator();

export const MyAppointmentsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="My Appointments Main" component={MyAppointments} />
      <Stack.Screen name="fChat" component={fChat} />
    </Stack.Navigator>
  );
};
