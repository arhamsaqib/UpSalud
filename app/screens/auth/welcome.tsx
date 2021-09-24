import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {Circle} from '../../components/circle';
import {ButtonStandard} from '../../core/button';
import {MyText} from '../../core/text';
import CheckBox from '@react-native-community/checkbox';
import {Logo} from '../../components/logo';

export const Welcome = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{marginVertical: '15%', alignItems: 'center', width: '90%'}}>
        <Logo />
      </View>
      <MyText style={styles.welcome}>WELCOME</MyText>
      <MyText style={{marginVertical: 10}}>Register to continue</MyText>
      <View style={{width: '90%', alignItems: 'center', marginVertical: 20}}>
        <ButtonStandard title="Register" />
        <Circle />
        <ButtonStandard title="Login" />
        {/* <View style={styles.tosCont}>
          <CheckBox boxType="square" />
          <MyText style={[styles.tosText, {marginLeft: 5}]}>
            I agree to the{' '}
          </MyText>

          <MyText
            style={[
              {
                color: COLORS.text_blue,
              },
              styles.tosText,
            ]}
            onPress={() => {}}>
            Terms and Conditions
          </MyText>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.light_blue,
  },
  welcome: {
    color: COLORS.text_blue,
    fontSize: 20,
    fontWeight: 'bold',
  },
  tosCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  tosText: {
    fontWeight: 'bold',
  },
});
