import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export const Chat = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <Text>Chat</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
