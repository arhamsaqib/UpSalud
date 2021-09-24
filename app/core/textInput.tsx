import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {COLORS} from '../colors';

interface TIProps extends TextInputProps {}

export const TextInputStandard = (props: TIProps) => {
  const {style, ...rest} = props;
  return (
    <TextInput autoCapitalize="none" {...rest} style={[styles.ti, style]} />
  );
};

const styles = StyleSheet.create({
  ti: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    height: 40,
    padding: 5,
    marginBottom: 5,
    borderColor: COLORS.yellow,
  },
});