import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {AppointmentCard} from '../../../components/AppointmentCard';

export const MyAppointments = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  console.log(state);

  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 20}}>
        <Text style={styles.title}>My Appointments</Text>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%'}}>
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
          </View>
        </View>
      </ScrollView>
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
