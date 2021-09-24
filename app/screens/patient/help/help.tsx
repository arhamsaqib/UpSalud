import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export const Help = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Help</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
