import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DoctorHome} from './home';
import {fChat} from '../../chat/fchat';

const Stack = createStackNavigator();

export const HomeStackDoctor = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Doctor Home" component={DoctorHome} />
      <Stack.Screen name="fChat" component={fChat} />
    </Stack.Navigator>
  );
};
