import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {MyText} from '../../core/text';
import {TextInputStandard} from '../../core/textInput';

import {ButtonStandard} from '../../core/button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-gesture-handler';
import {useState} from 'react';

export const Login = ({navigation}: any) => {
  function onContinue() {
    navigation.navigate('Patient');
  }
  const [show, setShow] = useState(false);
  function onForget() {}
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="arrow-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, {fontSize: 18}]}>Login</Text>
      </View>
      <View style={{width: '90%'}}>
        <View style={styles.infoCont}>
          <MyText style={styles.title}>Email</MyText>
          <TextInputStandard />
          <MyText style={styles.title}>Password</MyText>
          <TextInputStandard secureTextEntry={!show} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <MyText style={styles.title}>Show Passwords</MyText>
            <Switch onValueChange={setShow} value={show} />
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text
              onPress={onForget}
              style={[styles.title, {color: COLORS.dark_blue}]}>
              Forgot Password?
            </Text>
          </View>
        </View>
      </View>
      <View style={{width: '90%'}}>
        <ButtonStandard title="Login" onPress={onContinue} />
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
  infoCont: {
    //borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  relCont: {
    padding: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
