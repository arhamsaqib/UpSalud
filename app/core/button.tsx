import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {COLORS} from '../colors';

interface BProps extends TouchableOpacityProps {
  title?: string;
  secondary?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export const ButtonStandard = (props: BProps) => {
  const {title, style, secondary, textStyle, ...rest} = props;
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.btn, style, secondary && {backgroundColor: 'white'}]}>
      <Text
        style={[
          {color: 'white', fontWeight: 'bold', letterSpacing: -1},
          secondary && {color: COLORS.dark_blue},
          textStyle,
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    //borderWidth: 1,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.dark_blue,
    //borderColor: COLORS.yellow,
    marginVertical: 5,
  },
});
