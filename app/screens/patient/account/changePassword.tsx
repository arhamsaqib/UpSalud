import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-gesture-handler';
import {useState} from 'react';
import {MyText} from '../../../core/text';
import {GlobalStyles} from '../../../styles/globalStyles';
import {TextInputStandard} from '../../../core/textInput';
import {ButtonStandard} from '../../../core/button';
import {COLORS} from '../../../colors';

export const ChangePassword = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  function onPasswordEnter() {
    navigation.navigate('Patient');
  }
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="arrow-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, {fontSize: 18}]}>Change Password</Text>
      </View>
      <View style={{width: '90%'}}>
        <View style={[GlobalStyles.elevated_card, styles.card]}>
          <MyText style={styles.title}>Old Password</MyText>
          <TextInputStandard secureTextEntry={!show} />
          <MyText style={styles.title}>New Password</MyText>
          <TextInputStandard secureTextEntry={!show} />
          <MyText style={styles.title}>Confirm New Password</MyText>
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
          <ButtonStandard title="Change" onPress={onPasswordEnter} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  card: {},
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
});
