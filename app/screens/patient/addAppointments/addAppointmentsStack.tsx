import React from 'react';
import {AddAppointments} from './addAppointments';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const AddAppointmentsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Add Appointments Main" component={AddAppointments} />
    </Stack.Navigator>
  );
};
