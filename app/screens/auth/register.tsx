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
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [id, setId] = useState('');
  const [dob, setDob] = useState('');

  const [doctor, setDoctor] = useState(false);
  const [patient, setPatient] = useState(true);

  const [fmodal, setFModal] = useState(false);

  const [relation, setRelation]: any = useState();
  const [fnameRelative, setFnameRelative]: any = useState('');
  const [lnameRelative, setLnameRelative]: any = useState('');
  const [idNumberRelative, setIdNumberRelative]: any = useState('');
  const [dobRelative, setDobRelative]: any = useState('');
  const [ageRelative, setAgeRelative]: any = useState('');

  function onContinue() {
    const userInfo = {
      email: email,
      fname: fname,
      lname: lname,
      idnumber: id,
      dob: dob,
    };

    const relativeInfo = {
      fname: fnameRelative.toString(),
      lname: lnameRelative.toString(),
      relation: relation.toString(),
      age: ageRelative.toString(),
      dob: dobRelative.toString(),
      id_number: idNumberRelative.toString(),
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
      relativeInfo: relativeInfo,
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
  const dtext = '(Disabled for testing)';
  function disabled() {
    return email.length < 8 || fname.length < 3 || id.length < 1;
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
              <MyText style={styles.title}>Email *</MyText>
              <TextInputStandard onChangeText={setEmail} />

              <MyText style={styles.title}>First Name *</MyText>
              <TextInputStandard onChangeText={setFname} />

              <MyText style={styles.title}>Last Name</MyText>
              <TextInputStandard onChangeText={setLname} />

              <MyText style={styles.title}>ID Number *</MyText>
              <TextInputStandard onChangeText={setId} />

              <MyText style={styles.title}>Date of Birth</MyText>
              <TextInputStandard onChangeText={setDob} />
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
                    {relation ?? 'Choose Relation'}
                  </MyText>
                </TouchableOpacity>
                <FamilyRelation
                  modalVisibility={fmodal}
                  onCancelPress={() => setFModal(false)}
                  onSelect={setRelation}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>First Name</MyText>

                    <TextInputStandard onChangeText={setFnameRelative} />
                  </View>

                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>Last Name</MyText>

                    <TextInputStandard onChangeText={setLnameRelative} />
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

                    <TextInputStandard onChangeText={setIdNumberRelative} />
                  </View>
                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>Age</MyText>

                    <TextInputStandard
                      keyboardType="number-pad"
                      onChangeText={setAgeRelative}
                    />
                  </View>
                </View>
                <MyText style={styles.title}>Date of Birth</MyText>

                <TextInputStandard onChangeText={setDobRelative} />
              </View>
            )}
          </View>
          <View style={{width: '90%'}}>
            <ButtonStandard
              title="Continue"
              onPress={onContinue}
              disabled={disabled()}
            />
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
  disabled: {
    fontSize: 12,
    color: '#666666',
    letterSpacing: -1,
  },
});
