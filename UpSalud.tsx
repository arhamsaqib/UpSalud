import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Login} from './app/screens/auth/login';
import {Register} from './app/screens/auth/register';
import {Role} from './app/screens/role/role';
import {PatientDrawerNav} from './app/screens/patient/drawerNav/patientDrawerNav';

import {createStackNavigator} from '@react-navigation/stack';
import {Welcome} from './app/screens/auth/welcome';
import {SetPassword} from './app/screens/auth/password';
import {Forget} from './app/screens/auth/forget';
import {DoctorDrawerNav} from './app/screens/doctor/drawerNav/doctorDrawerNav';
const Stack = createStackNavigator();

export const UpSalud = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forget Password" component={Forget} />
        <Stack.Screen name="Set Password" component={SetPassword} />
        <Stack.Screen name="Role" component={Role} />
        <Stack.Screen name="Patient" component={PatientDrawerNav} />
        <Stack.Screen name="Doctor" component={DoctorDrawerNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
