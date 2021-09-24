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
  iconName?: string;
  iconColor?: string;
}

export const SubmenuOption = (props: BProps) => {
  const {title, style, secondary, textStyle, ...rest} = props;
  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.btn,
        style,
        secondary && {backgroundColor: COLORS.dark_blue},
      ]}>
      <Text
        style={[
          {color: COLORS.dark_blue, fontWeight: 'bold', letterSpacing: -1},
          secondary && {color: 'white'},
          textStyle,
        ]}>
        {props.title}
      </Text>
      {/* {props.iconName && (
        <Icon name={props.iconName} size={30} color={props.iconColor} />
      )} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: COLORS.dark_blue,
    marginVertical: 5,
    flexDirection: 'row',
  },
});
