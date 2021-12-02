import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Payment} from './payment';

const Stack = createStackNavigator();

export const PaymentStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Payment Main" component={Payment} />
    </Stack.Navigator>
  );
};
