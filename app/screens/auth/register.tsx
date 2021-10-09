import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {MyText} from '../../core/text';
import {TextInputStandard} from '../../core/textInput';
import {FamilyRelation} from '../../components/RelationsModal';
import {useState} from 'react';
import {ButtonStandard} from '../../core/button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-gesture-handler';

export const Register = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [doctor, setDoctor] = useState(false);
  const [patient, setPatient] = useState(true);
  const [fmodal, setFModal] = useState(false);
  function onContinue() {
    const userInfo = {
      email: email,
      fname: '',
      lname: '',
      idnumber: '',
      dob: '',
    };

    var user_type;
    if (doctor) {
      user_type = 'doctor';
    }
    if (patient) {
      user_type = 'patient';
    }
    navigation.navigate('Set Password', {
      user_type: user_type,
      userInfo: userInfo,
    });
  }
  function onDoctorSet(val: boolean) {
    setDoctor(val);
    if (val) {
      setPatient(false);
    } else {
      setPatient(true);
    }
  }
  function onPatientSet(val: boolean) {
    setPatient(val);
    if (val) {
      setDoctor(false);
    } else {
      setDoctor(true);
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
        <Text style={[styles.title, {fontSize: 18}]}>Register</Text>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%'}}>
            <View style={styles.infoCont}>
              <MyText style={styles.title}>Email</MyText>
              <TextInputStandard onChangeText={setEmail} />
              <MyText style={styles.title}>First Name</MyText>
              <TextInputStandard />
              <MyText style={styles.title}>Last Name</MyText>
              <TextInputStandard />
              <MyText style={styles.title}>ID Number</MyText>
              <TextInputStandard />
              <MyText style={styles.title}>Date of Birth</MyText>
              <TextInputStandard />
            </View>
            <View style={styles.infoCont}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <MyText style={styles.title}>Register as a doctor</MyText>
                <Switch onValueChange={onDoctorSet} value={doctor} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <MyText style={styles.title}>Register as a patient</MyText>
                <Switch onValueChange={onPatientSet} value={patient} />
              </View>
            </View>
            {patient && (
              <View style={styles.infoCont}>
                <MyText
                  style={[
                    styles.title,
                    {
                      textAlign: 'center',
                      color: COLORS.dark_blue,
                      marginBottom: 20,
                    },
                  ]}>
                  Register a Family Member
                </MyText>
                {/* <MyText style={styles.title}></MyText>
          <TextInputStandard /> */}
                <TouchableOpacity
                  style={styles.relCont}
                  onPress={() => setFModal(true)}>
                  <MyText style={{fontWeight: 'bold', letterSpacing: -1}}>
                    Choose Relation
                  </MyText>
                </TouchableOpacity>
                <FamilyRelation
                  modalVisibility={fmodal}
                  onCancelPress={() => setFModal(false)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>First Name</MyText>
                    <TextInputStandard />
                  </View>

                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>Last Name</MyText>
                    <TextInputStandard />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>ID Number</MyText>
                    <TextInputStandard />
                  </View>
                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>Age</MyText>
                    <TextInputStandard keyboardType="number-pad" />
                  </View>
                </View>
                <MyText style={styles.title}>Date of Birth</MyText>
                <TextInputStandard />
              </View>
            )}
          </View>
          <View style={{width: '90%'}}>
            <ButtonStandard title="Continue" onPress={onContinue} />
          </View>
        </View>
      </ScrollView>
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
