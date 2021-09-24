import React from 'react';
import {MyAppointments} from './myAppointments';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const MyAppointmentsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="My Appointments Main" component={MyAppointments} />
    </Stack.Navigator>
  );
};
