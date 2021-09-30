import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../colors';
import {GlobalStyles} from '../styles/globalStyles';

interface Card {
  onPress?(): void;
}

export const ChatCard = (props: Card) => {
  return (
    <TouchableOpacity
      style={[styles.main, GlobalStyles.elevated_card, {marginVertical: 5}]}>
      <View style={{width: '25%'}}>
        <Image
          style={{
            height: 70,
            width: 70,
            borderRadius: 70,
            borderWidth: 1,
            borderColor: COLORS.dark_blue,
          }}
          source={require('../assets/images/person.png')}
        />
      </View>
      <View
        style={{
          width: '73%',
          //borderWidth: 1,
          //height: '100%',
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>Arham Saqib</Text>
        <Text ellipsizeMode="tail" style={styles.desc}>
          Hello, How are you? What are you doing now a days
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    // borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.blue,
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  desc: {
    letterSpacing: -1,
  },
});
