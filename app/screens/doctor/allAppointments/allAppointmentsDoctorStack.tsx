import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AllAppointmentsDoctor} from './allAppointmentsDoctor';

const Stack = createStackNavigator();

export const AllAppointmentsDoctorStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="All Appointments Doctor"
        component={AllAppointmentsDoctor}
      />
    </Stack.Navigator>
  );
};
