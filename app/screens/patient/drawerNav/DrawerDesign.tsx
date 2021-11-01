import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';
import {Avatar} from '../../../components/avatar';
import {MyText} from '../../../core/text';
import {GlobalStyles} from '../../../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import {RootStateOrAny, useSelector} from 'react-redux';
import {showPatientById} from '../../../api/patientAppointments';
import {showDoctorById} from '../../../api/doctorAppointment';
import {useEffect} from 'react';

export const CustomDrawer = (props: any) => {
  const [user, setUser]: any = useState([]);
  async function onLogout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        props.navigation.navigate('Login');
      });
  }
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  //console.log(state);

  async function FetchAPI() {
    if (state.role === 'patient') {
      const res = await showPatientById({patient_id: state.id});
      //console.log(res, 'Patient');

      if (res.id !== undefined) {
        setUser(res);
      }
    }
    if (state.role === 'doctor') {
      const res = await showDoctorById({doctor_id: state.id});
      //console.log(res, 'Doctor');

      if (res.id !== undefined) {
        setUser(res);
      }
    }
  }
  useEffect(() => {
    FetchAPI();
  }, []);
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.header}>
        <View
          style={{
            width: '90%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={props.navigation.closeDrawer}>
            <Icon name="close" size={35} color={COLORS.text_blue} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '5%',
          }}>
          <View style={{width: '30%'}}>
            <Avatar />
          </View>
          <View
            style={[
              styles.headerTextCont,
              {
                width: '40%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              },
            ]}>
            <MyText
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                letterSpacing: -1,
              }}>
              {user.name ?? 'User'}
            </MyText>
            <MyText style={{fontSize: 15, letterSpacing: -1}}>
              {user.role}
            </MyText>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView>
        {/* <SafeAreaView> */}

        <View
          style={{
            marginTop: 60,
            marginLeft: '10%',
          }}>
          <DrawerItemList {...props} />
        </View>
        {/* </SafeAreaView> */}
      </ScrollView>
      <View
        style={{
          width: '80%',
          alignItems: 'center',
          alignSelf: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          onPress={onLogout}
          style={[styles.logout, GlobalStyles.elevated_card]}>
          <Icon name="log-out-outline" color={COLORS.danger} size={30} />
          <MyText style={{fontSize: 17, letterSpacing: -1, fontWeight: 'bold'}}>
            Logout
          </MyText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // borderWidth: 1,
    //height: 100,
    //marginTop: '20%',
    justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light_blue,
    minHeight: '20%',
  },
  headerTextCont: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logout: {
    flexDirection: 'row',
    //borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 5,
  },
});
