import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {PermanentLocationSettings} from './locationSettings';
import {SettingsDoctor} from './settings';

const Stack = createStackNavigator();

export const SettingsStackDoctor = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings Doctor" component={SettingsDoctor} />
      <Stack.Screen
        name="Permanent Location Settings"
        component={PermanentLocationSettings}
      />
    </Stack.Navigator>
  );
};
