import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DoctorHome} from './home';
import {fChat} from '../../chat/fchat';
import CallScreen from '../../patient/videocall/createcall';
import JoinScreen from '../../patient/videocall/joincall';

const Stack = createStackNavigator();

export const HomeStackDoctor = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Doctor Home" component={DoctorHome} />
      <Stack.Screen name="fChat" component={fChat} />
      <Stack.Screen name="makeCallD" component={CallScreen} />
      <Stack.Screen name="joinCallD" component={JoinScreen} />
    </Stack.Navigator>
  );
};
