import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import {COLORS} from '../colors';

interface LogoProps {
  style?: StyleProp<ImageStyle>;
}

export const Logo = (props: LogoProps) => {
  return (
    <Image
      style={[styles.main, props.style]}
      source={require('../assets/logo/tempLogo.png')}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    height: 150,
    width: 150,
    borderRadius: 150,
    borderColor: COLORS.text_blue,
    borderWidth: 1,
  },
});
