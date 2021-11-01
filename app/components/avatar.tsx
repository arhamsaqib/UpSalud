import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {COLORS} from '../colors';

interface LogoProps {
  style?: StyleProp<ImageStyle>;
}

export const Avatar = (props: LogoProps) => {
  return (
    <Image
      style={[styles.main, props.style]}
      source={require('../assets/images/person.png')}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    height: 80,
    width: 80,
    borderRadius: 80,
    borderColor: COLORS.text_blue,
    borderWidth: 1,
  },
});
