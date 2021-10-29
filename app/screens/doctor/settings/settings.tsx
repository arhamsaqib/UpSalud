import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyText} from '../../../core/text';
import {GlobalStyles} from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';

export const SettingsDoctor = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 40}}>
        <MyText style={[styles.title, {fontSize: 20}]}>Settings</MyText>
      </View>
      <View style={{width: '90%'}}>
        <TouchableOpacity style={[GlobalStyles.elevated_card, styles.opt]}>
          <Icon
            name="person-outline"
            size={18}
            color={COLORS.blue}
            style={{marginRight: 5}}
          />
          <MyText style={styles.fieldHead}>Profile</MyText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Location Settings')}
          style={[GlobalStyles.elevated_card, styles.opt]}>
          <Icon
            style={{marginRight: 5}}
            name="location-outline"
            size={18}
            color={COLORS.blue}
          />
          <MyText style={styles.fieldHead}>Location Settings</MyText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fieldHead: {
    width: '35%',
    fontWeight: 'bold',
    letterSpacing: -1,
    color: COLORS.blue,
  },
  opt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
