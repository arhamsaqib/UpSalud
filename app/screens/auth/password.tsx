import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {ButtonStandard} from '../../core/button';
import {MyText} from '../../core/text';
import {TextInputStandard} from '../../core/textInput';
import {GlobalStyles} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-gesture-handler';
import {useState} from 'react';
import {useEffect} from 'react';

export const SetPassword = ({navigation, route}: any) => {
  useEffect(() => {
    console.log(route.params, 'Params');
  }, []);
  const [show, setShow] = useState(false);
  function onPasswordEnter() {
    if (route.params.user_type === 'patient') {
      navigation.navigate('Patient');
    }
    if (route.params.user_type === 'doctor') {
      navigation.navigate('Doctor');
    }
  }
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="arrow-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, {fontSize: 18}]}>Set Password</Text>
      </View>
      <View style={{width: '90%'}}>
        <View style={[GlobalStyles.elevated_card, styles.card]}>
          <MyText style={styles.title}>Password</MyText>
          <TextInputStandard secureTextEntry={!show} />
          <MyText style={styles.title}>Confirm Password</MyText>
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
          <ButtonStandard title="Continue" onPress={onPasswordEnter} />
        </View>
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
  card: {},
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
});
