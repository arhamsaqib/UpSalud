import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../colors';

export const MenuIcon = (props: {navigation?: any}) => {
  return (
    <Icon
      onPress={() => props.navigation.openDrawer()}
      name="menu-outline"
      size={30}
      color={COLORS.emerald_green}
    />
  );
};
