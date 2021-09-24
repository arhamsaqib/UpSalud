import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export const Account = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Account</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
