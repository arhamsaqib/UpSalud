import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import {AppointmentCard} from '../../../components/AppointmentCard';

export const MyAppointments = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 20}}>
        <Text style={styles.title}>My Appointments</Text>
      </View>
      <View style={{width: '90%'}}>
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
        <AppointmentCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
