import React, {FunctionComponent} from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
type CustomTextProps = {
  style?: StyleProp<TextStyle>;
  //numberOfLines?: number;
  onPress?(): void;
  children?: any;
};
export const MyText: FunctionComponent<CustomTextProps> = ({
  children,
  style,
  onPress,
}) => {
  return (
    <Text onPress={onPress} style={[styles.myText, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  myText: {},
});
