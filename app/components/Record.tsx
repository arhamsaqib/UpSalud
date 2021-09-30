import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {COLORS} from '../colors';
import {GlobalStyles} from '../styles/globalStyles';

interface Card {
  doctor?: string;
  date?: string;
  reason?: string;
  onPress?(): void;
}

export const MedicalRecordCard = (props: Card) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.card, GlobalStyles.elevated_card]}>
      <View
        style={[
          GlobalStyles.elevated_card,
          {alignItems: 'center', flexDirection: 'row', marginVertical: 3},
        ]}>
        <Text style={styles.title}>Doctor : </Text>
        <Text style={styles.value}>{props.doctor ?? 'John Doe'}</Text>
      </View>
      <View
        style={[
          GlobalStyles.elevated_card,
          {alignItems: 'center', flexDirection: 'row', marginVertical: 3},
        ]}>
        <Text style={styles.title}>Reason : </Text>
        <Text style={styles.value}>{props.reason ?? 'Headache'}</Text>
      </View>
      <View
        style={[
          GlobalStyles.elevated_card,
          {alignItems: 'center', flexDirection: 'row', marginVertical: 3},
        ]}>
        <Text style={styles.title}>Date : </Text>
        <Text style={styles.value}>{props.date ?? 'Aug 21 2020'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: COLORS.blue,
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  value: {
    letterSpacing: -1,
  },
});
