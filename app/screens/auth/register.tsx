import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView, Text} from 'react-native';

export const Register = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Register</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
  },
});
