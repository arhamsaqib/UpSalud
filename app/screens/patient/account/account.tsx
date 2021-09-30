import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../colors';
import {GlobalStyles} from '../../../styles/globalStyles';

interface CProps {
  onPress?(): void;
  name?: string;
}

const Card = (props: CProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.card, GlobalStyles.elevated_card, {marginVertical: 5}]}>
      <Text style={styles.head}>{props.name}</Text>
    </TouchableOpacity>
  );
};

export const Account = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 20}}>
        <Text style={styles.title}>Account</Text>
      </View>

      <View style={{width: '90%'}}>
        <Card name="Profile" />
        <Card name="Change Password" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  head: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.dark_blue,
  },
  card: {
    padding: 10,
    justifyContent: 'center',
  },
});
