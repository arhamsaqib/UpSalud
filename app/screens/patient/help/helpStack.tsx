import React from 'react';
import {Help} from './help';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const HelpStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Help Main" component={Help} />
    </Stack.Navigator>
  );
};
