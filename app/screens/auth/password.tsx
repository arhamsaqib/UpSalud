import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Switch} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {ButtonStandard} from '../../core/button';
import {MyText} from '../../core/text';
import {TextInputStandard} from '../../core/textInput';
import {GlobalStyles} from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {createUser} from '../../api/users';

export const SetPassword = ({navigation, route}: any) => {
  useEffect(() => {
    //console.log(route.params, 'Params');
  }, []);
  const [newPassword, setNewPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function createLaravelUser(uid: string) {
    const data = {
      name: 'XYZ',
      email: route.params.userInfo.email,
      fuid: uid,
      role: route.params.user_type,
    };
    const newuser = await createUser(data).finally(() => {
      setLoading(false);
    });
    if (route.params.user_type === 'patient') {
      navigation.navigate('Patient');
    }
    if (route.params.user_type === 'doctor') {
      navigation.navigate('Doctor');
    }
  }

  async function onPasswordEnter() {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(route.params.userInfo.email, newPassword)
      .then(userCredential => {
        const uid = userCredential.user.uid;

        createLaravelUser(uid);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
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
          <TextInputStandard
            secureTextEntry={!show}
            onChangeText={setNewPassword}
          />
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
          <ButtonStandard
            title="Continue"
            loading={loading}
            disabled={loading}
            onPress={onPasswordEnter}
          />
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
