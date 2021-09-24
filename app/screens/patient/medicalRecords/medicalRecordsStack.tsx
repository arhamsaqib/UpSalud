import React from 'react';
import {MedicalRecords} from './medicalRecords';

import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

export const MedicalRecordsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Medical Records Main" component={MedicalRecords} />
    </Stack.Navigator>
  );
};
