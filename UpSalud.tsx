import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from './app/screens/auth/login';
import {Register} from './app/screens/auth/register';
import {Role} from './app/screens/role/role';
import {PatientDrawerNav} from './app/screens/patient/drawerNav/patientDrawerNav';

import {createStackNavigator} from '@react-navigation/stack';
import {Welcome} from './app/screens/auth/welcome';
const Stack = createStackNavigator();

export const UpSalud = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Role" component={Role} />
        <Stack.Screen name="Patient" component={PatientDrawerNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
