import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {VideoCall} from './videocall';
import CallScreen from './createcall';
import JoinScreen from './joincall';

const Stack = createStackNavigator();

export const VideoCallStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Video Call" component={VideoCall} />
      <Stack.Screen name="Call" component={CallScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
    </Stack.Navigator>
  );
};
