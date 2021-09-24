import React from 'react';
import {Chat} from './chat';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chat Main" component={Chat} />
    </Stack.Navigator>
  );
};
