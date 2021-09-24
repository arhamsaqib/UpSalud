import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export const MedicalRecords = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Medical Records</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
