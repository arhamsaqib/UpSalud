import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {MyText} from '../../core/text';
import {TextInputStandard} from '../../core/textInput';
import {ButtonStandard} from '../../core/button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {showUser} from '../../api/users';
import {RootStateOrAny, useSelector, useStore} from 'react-redux';
import SetUserAction from '../../redux/actions/CurrentUserActionRedux';
import {CheckApi} from '../../api/checkapi';
import {CheckBox} from '../../components/checkBox';
import rememberMeAction from '../../redux/actions/rememberMeAction';

export const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const store = useStore();

  const [rememberMe, setRememberMe] = useState(false);
  const state = useSelector((state: RootStateOrAny) => state.rememberMe);
  function checkRememberMe() {
    if (state.rememberMe) {
      setEmail(state.email);
      setPassword(state.password);
      setRememberMe(state.rememberMe);
    }
  }

  useEffect(() => {
    checkRememberMe();
  }, []);

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  // function onAuthStateChanged(user: any) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  //   if (user) navigation.replace('Patient');
  // }
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);
  async function verifyLaravelUser(uid: any) {
    //console.log(uid);
    const user = await showUser(uid);
    if (user.id !== undefined) {
      store.dispatch(
        SetUserAction({
          id: user.id,
          role: user.role,
        }),
      );

      if (rememberMe) {
        store.dispatch(
          rememberMeAction({
            email: email,
            password: password,
            rememberMe: true,
          }),
        );
      } else {
        store.dispatch(
          rememberMeAction({
            email: '',
            password: '',
            rememberMe: false,
          }),
        );
      }
    }
    if (user.role === 'patient') {
      navigation.navigate('Patient');
    }
    if (user.role === 'doctor') {
      navigation.navigate('Doctor');
    }
  }

  function onContinue() {
    setLoader(true);
    setError(false);
    auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .then(userCredential => {
        setLoader(false);
        const uid = userCredential.user.uid;
        verifyLaravelUser(uid);
        //console.log('User account created & signed in!');
      })
      .catch(error => {
        setLoader(false);
        setError(true);
        // if (error === 'auth/email-already-in-use') {
        //   console.log('That email address is already in use!');
        // }

        // if (error === 'auth/invalid-email') {
        //   console.log('That email address is invalid!');
        // }
        // if (error === 'auth/user-not-found') {
        //   console.log('User not found!');
        // }

        //console.error(error[0].error, 'Errro');
      });
    //navigation.navigate('Patient');
  }
  const [show, setShow] = useState(false);
  function onForget() {
    navigation.navigate('Forget Password');
  }

  function disabled() {
    return email.length < 8 || password.length < 8;
  }

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
          <TextInputStandard value={email} onChangeText={setEmail} />
          <MyText style={styles.title}>Password</MyText>
          <TextInputStandard
            onChangeText={setPassword}
            secureTextEntry={!show}
            value={password}
          />
          <View style={styles.row}>
            <MyText style={styles.rememberMe}>Remember Me</MyText>
            <CheckBox onChangeVal={setRememberMe} value={rememberMe} />
          </View>
          {error && (
            <Text style={styles.errorTxt}>
              Sorry! We could not find an account with these credentials
            </Text>
          )}
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
        <ButtonStandard
          loading={loader}
          disabled={loader || disabled()}
          title="Login"
          onPress={onContinue}
        />

        {/* <ButtonStandard
          loading={loader}
          disabled={loader}
          title="Doctor"
          onPress={() => {
            setEmail('shujasaqib@outlook.com');
            setPassword('hahabisti123');
          }}
        />
        <ButtonStandard
          loading={loader}
          disabled={loader}
          title="Patient"
          onPress={() => {
            setEmail('arhamsaqib@outlook.com');
            setPassword('hahabisti123');
          }}
        /> */}
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
  errorTxt: {
    letterSpacing: -1,
    color: COLORS.danger,
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginVertical: 10,
  },
  rememberMe: {
    fontWeight: '700',
    fontSize: 13,
    color: COLORS.dark_grey,
    marginRight: 10,
  },
});
