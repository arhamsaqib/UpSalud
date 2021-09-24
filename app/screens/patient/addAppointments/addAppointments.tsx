import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export const AddAppointments = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Add Appointments</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
