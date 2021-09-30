import React from 'react';
import {Account} from './account';

import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from './profile';
import {ManageFamilyMembers} from './manageFamilyMember';
import {AddFamilyMember} from './addFamilyMember';
import {ChangePassword} from './changePassword';
const Stack = createStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account Main" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Change Password" component={ChangePassword} />
      <Stack.Screen name="Add Family Member" component={AddFamilyMember} />
      <Stack.Screen
        name="Manage Family Members"
        component={ManageFamilyMembers}
      />
    </Stack.Navigator>
  );
};
