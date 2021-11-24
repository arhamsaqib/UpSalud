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
import {useStore} from 'react-redux';
import SetUserAction from '../../redux/actions/CurrentUserActionRedux';
import {storeBasicInformation} from '../../api/basicInformation';
import {storeFamilyMember} from '../../api/familyMembers';

export const SetPassword = ({navigation, route}: any) => {
  useEffect(() => {
    //console.log(route.params, 'Params');
  }, []);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const store = useStore();
  async function createLaravelUser(uid: string) {
    const uinfo = route.params.userInfo;
    const relativeInfo = route.params.relativeInfo;
    const data = {
      name: route.params.userInfo.fname,
      email: route.params.userInfo.email,
      fuid: uid,
      role: route.params.user_type,
    };

    const user = await createUser(data).finally(() => {
      setLoading(false);
    });
    console.log(user, 'New User');
    if (user.id !== undefined) {
      store.dispatch(
        SetUserAction({
          id: user.id,
          role: user.role,
        }),
      );
    }

    const basicData = {
      fname: uinfo.fname,
      lname: uinfo.lname,
      uid: user.id.toString(),
      dob: uinfo.dob,
      id_number: uinfo.idnumber,
    };

    const relativeInfoData = {
      fname: relativeInfo.fname.toString(),
      lname: relativeInfo.lname.toString(),
      relation: relativeInfo.relation.toString(),
      age: relativeInfo.age.toString(),
      dob: relativeInfo.dob.toString(),
      id_number: relativeInfo.id_number.toString(),
      uid: user.id.toString(),
    };

    const basicInformationRes = await storeBasicInformation(basicData);

    if (relativeInfo.submit) {
      const familyMember = await storeFamilyMember(relativeInfoData);
      console.log(familyMember, 'Family member');
    }
    if (user.role === 'patient') {
      navigation.navigate('Patient');
    }
    if (user.role === 'doctor') {
      navigation.navigate('Doctor');
    }

    // if (route.params.user_type === 'patient') {
    //   navigation.navigate('Patient');
    // }
    // if (route.params.user_type === 'doctor') {
    //   navigation.navigate('Doctor');
    // }
  }

  function disabled() {
    return (
      newPassword.length < 8 ||
      confirmPassword.length < 8 ||
      confirmPassword !== newPassword
    );
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
          <TextInputStandard
            secureTextEntry={!show}
            onChangeText={setConfirmPassword}
          />
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
            disabled={disabled() || loading}
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
  disabled: {
    fontSize: 12,
    color: '#666666',
    letterSpacing: -1,
  },
});
