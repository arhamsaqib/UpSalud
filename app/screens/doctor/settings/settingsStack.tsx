import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Profile} from '../../patient/account/profile';
import {PermanentLocationSettings} from './locationSettings';
import {SetSpeciality} from './setSpeciality';
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
      <Stack.Screen name="Set Speciality" component={SetSpeciality} />
      <Stack.Screen name="Doctor Profile" component={Profile} />
    </Stack.Navigator>
  );
};
