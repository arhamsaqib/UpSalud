import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {AddFamilyMember} from '../../patient/account/addFamilyMember';
import {ManageFamilyMembers} from '../../patient/account/manageFamilyMember';
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
      <Stack.Screen name="Add Family Member" component={AddFamilyMember} />
      <Stack.Screen
        name="Manage Family Members"
        component={ManageFamilyMembers}
      />
    </Stack.Navigator>
  );
};
