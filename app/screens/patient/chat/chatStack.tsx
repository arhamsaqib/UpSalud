import React from 'react';
import {Chat} from './chat';
import {ChatDetails} from './chatDetails';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chat Main" component={Chat} />
      <Stack.Screen name="Chat Details" component={ChatDetails} />
    </Stack.Navigator>
  );
};
