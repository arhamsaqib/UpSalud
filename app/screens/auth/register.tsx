import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Switch,
  Alert,
} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {MyText} from '../../core/text';
import {TextInputStandard} from '../../core/textInput';
import {FamilyRelation} from '../../components/RelationsModal';
import {useState} from 'react';
import {ButtonStandard} from '../../core/button';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ConvertDateToObject} from '../../components/ConvertDateToObject';
//@ts-ignore
import {format, isValid, validate} from './components/rut';

export const Register = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [id, setId]: any = useState('');
  const [dob, setDob]: any = useState(new Date());

  const [doctor, setDoctor] = useState(false);
  const [patient, setPatient] = useState(true);
  const [family, setFamily] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [validation, setValidation] = useState(false);
  const [relativeDateModal, setRelativeDateModal] = useState(false);

  const [fmodal, setFModal] = useState(false);

  const [relation, setRelation]: any = useState('');
  const [fnameRelative, setFnameRelative]: any = useState('');
  const [lnameRelative, setLnameRelative]: any = useState('');
  const [idNumberRelative, setIdNumberRelative]: any = useState('');
  const [dobRelative, setDobRelative]: any = useState(new Date());
  const [ageRelative, setAgeRelative]: any = useState('');

  function onContinue() {
    if (!RutValidate()) {
      Alert.alert('Rut validation not passed!');
      return;
    }
    const userInfo = {
      email: email.trim(),
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
      submit: family,
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
  function disabled() {
    return (
      email.length < 8 ||
      fname.length < 3 ||
      id.length < 1 ||
      lname.length < 3 ||
      dob.toString().length < 3 ||
      !validation
    );
  }
  function disabledF() {
    if (family) {
      return (
        relation.length < 2 ||
        fnameRelative.length < 3 ||
        idNumberRelative.length < 1 ||
        lnameRelative.length < 3 ||
        dobRelative.length < 3 ||
        ageRelative < 1
      );
    } else {
      return false;
    }
  }

  const RutValidate = () => {
    if (!validate(id)) {
      //alert('El RUT ingresado no es correcto, intentalo denuevo.');
      setId('');
      setValidation(false);
      return false;
      //e.target.focus()
    } else {
      setValidation(true);
      return true;
    }
  };
  const RutFormat = (e: any) => {
    if (isValid(e)) {
      setId(format(e));
    }
  };
  const handleConfirm = (date: Date) => {
    setDob(date);
    setDateModal(false);
  };
  const handleConfirmRelative = (date: Date) => {
    setDobRelative(date);
    setRelativeDateModal(false);
  };

  const selectedDob = ConvertDateToObject(dob.toString());
  const relativeSelectedDob = ConvertDateToObject(dobRelative.toString());

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
              <MyText style={styles.disabled}>Required</MyText>
              <TextInputStandard onChangeText={setEmail} />

              <MyText style={styles.title}>First Name</MyText>
              <MyText style={styles.disabled}>Required</MyText>

              <TextInputStandard onChangeText={setFname} />

              <MyText style={styles.title}>Last Name</MyText>
              <MyText style={styles.disabled}>Required</MyText>

              <TextInputStandard onChangeText={setLname} />

              <MyText style={[styles.title]}>ID Number{''}</MyText>

              <MyText style={styles.disabled}>
                Validation Required{'      '}
                <MyText
                  onPress={RutValidate}
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: COLORS.emerald_green,
                  }}>
                  Tap to check
                </MyText>
              </MyText>

              <MyText
                style={[
                  styles.disabled,
                  validation && {color: COLORS.emerald_green},
                ]}>
                {validation ? 'Passed' : 'Not Passed'}
              </MyText>

              <TextInputStandard
                onChangeText={RutFormat}
                value={id}
                onBlur={RutValidate}
              />

              <MyText style={styles.title}>Date of Birth</MyText>
              <MyText style={styles.disabled}>Required</MyText>

              {/* <TextInputStandard onChangeText={setDob} /> */}
              <TouchableOpacity
                style={styles.relCont}
                onPress={() => setDateModal(true)}>
                <MyText style={{fontWeight: 'bold', letterSpacing: -1}}>
                  {selectedDob.date +
                    ' ' +
                    selectedDob.month +
                    ' ' +
                    selectedDob.year}
                </MyText>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={dateModal}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDateModal(false)}
              />
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
            <View
              style={[
                styles.infoCont,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              <MyText
                style={[
                  styles.title,
                  {
                    color: COLORS.dark_blue,
                  },
                ]}>
                Register family
              </MyText>
              <Switch onValueChange={setFamily} value={family} />
            </View>
            {family && (
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
                <MyText style={styles.title}>Select Relation</MyText>
                <MyText style={styles.disabled}>Required</MyText>

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
                    <MyText style={styles.disabled}>Required</MyText>

                    <TextInputStandard onChangeText={setFnameRelative} />
                  </View>

                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>Last Name</MyText>
                    <MyText style={styles.disabled}>Required</MyText>

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
                    <MyText style={styles.disabled}>Required</MyText>

                    <TextInputStandard onChangeText={setIdNumberRelative} />
                  </View>
                  <View style={{width: '45%'}}>
                    <MyText style={styles.title}>Age</MyText>
                    <MyText style={styles.disabled}>Required</MyText>

                    <TextInputStandard
                      keyboardType="number-pad"
                      onChangeText={setAgeRelative}
                    />
                  </View>
                </View>

                <MyText style={styles.title}>Date of Birth</MyText>
                <MyText style={styles.disabled}>Required</MyText>

                <TouchableOpacity
                  style={styles.relCont}
                  onPress={() => setRelativeDateModal(true)}>
                  <MyText style={{fontWeight: 'bold', letterSpacing: -1}}>
                    {relativeSelectedDob.date +
                      ' ' +
                      relativeSelectedDob.month +
                      ' ' +
                      relativeSelectedDob.year}
                  </MyText>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={relativeDateModal}
                  mode="date"
                  onConfirm={handleConfirmRelative}
                  onCancel={() => setRelativeDateModal(false)}
                />
              </View>
            )}
          </View>
          <View style={{width: '90%'}}>
            <ButtonStandard
              title="Continue"
              onPress={onContinue}
              disabled={disabled() || disabledF()}
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
    backgroundColor: COLORS.new_blue,
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
