import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DoctorHome} from './home';

const Stack = createStackNavigator();

export const HomeStackDoctor = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Doctor Home" component={DoctorHome} />
    </Stack.Navigator>
  );
};
