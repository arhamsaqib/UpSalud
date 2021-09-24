import React from 'react';
import {Account} from './account';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account Main" component={Account} />
    </Stack.Navigator>
  );
};
