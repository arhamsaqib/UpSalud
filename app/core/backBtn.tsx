import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Btn {
  onPress?(): void;
}

export const BackBtn = (props: Btn) => {
  return (
    <TouchableOpacity style={styles.main} onPress={props.onPress}>
      <Icon name="arrow-back-outline" size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {},
});
