import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {View} from 'react-native';

interface CircleProps extends ViewProps {}

export const Circle = (props: CircleProps) => {
  const {style} = props;
  return <View style={[styles.main, style]}></View>;
};

const styles = StyleSheet.create({
  main: {
    height: 15,
    width: 15,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    marginVertical: 20,
  },
});
