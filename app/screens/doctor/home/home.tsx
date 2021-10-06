import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {MyText} from '../../../core/text';

export const DoctorHome = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <MyText>Hi</MyText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});
