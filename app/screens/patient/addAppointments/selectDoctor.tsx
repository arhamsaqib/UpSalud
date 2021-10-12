import React from 'react';
import {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Touchable,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS} from '../../../colors';
import {ButtonStandard} from '../../../core/button';
import {GlobalStyles} from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyText} from '../../../core/text';
import {DoctorCard} from '../../../components/DoctorCard';
import {useEffect} from 'react';
import {showDoctors} from '../../../api/showDoctors';
import {FlatList} from 'react-native-gesture-handler';
import {makeAppointment} from '../../../api/appointments';
import {RootStateOrAny, useSelector} from 'react-redux';

export const SelectDoctor = ({navigation, route}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  async function FetchAPI() {
    console.log(route.params, 'Params');

    const data = await showDoctors('doctor').finally(() => {
      setLoader(false);
    });
    //console.log(data);

    setDoctors(data);
  }
  useEffect(() => {
    setLoader(true);
    FetchAPI();
  }, []);
  const [doctors, setDoctors]: any = useState([]);
  const [selectedDoctor, setSelectedDoctor]: any = useState([]);
  const [loader, setLoader]: any = useState([]);
  async function onAppointmentBook() {
    const details = route.params.appointmentDetails;
    setLoader(true);
    const data = {
      reason: details.reason.toString(),
      emergency: details.emergency,
      uid: state.id.toString(),
      doctor_id: selectedDoctor.id.toString(),
      status: 'pending',
      date: details.date.toString(),
      lat: '0',
      lng: '0',
    };
    console.log(data);

    const setApt = await makeAppointment(data).finally(() => setLoader(false));
    console.log(setApt);

    if (setApt.id !== undefined) {
      Alert.alert('Appointment Booked');
      navigation.navigate('Add Appointments Main');
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
        <MyText style={[styles.head, {fontSize: 18}]}>Select a Doctor</MyText>
      </View>
      <View style={[{width: '90%', marginTop: 20}]}>
        <TouchableOpacity
          style={[
            GlobalStyles.elevated_card,
            {alignItems: 'center', backgroundColor: COLORS.light_blue},
          ]}>
          <MyText
            style={[styles.head, {fontSize: 15, color: COLORS.text_blue}]}>
            Search for a new Doctor
          </MyText>
        </TouchableOpacity>
        <View style={[GlobalStyles.elevated_card, {alignItems: 'center'}]}>
          <MyText
            style={[styles.head, {fontSize: 15, color: COLORS.text_blue}]}>
            Choose from previously contacted doctors
          </MyText>
        </View>
      </View>
      {loader && <ActivityIndicator color={COLORS.dark_blue} size={'small'} />}
      {!loader && (
        <View style={{width: '90%'}}>
          <FlatList
            data={doctors}
            renderItem={({item, index}: any) => (
              <DoctorCard
                selected={selectedDoctor.id === item.id}
                name={item.name}
                onPress={() => setSelectedDoctor(item)}
              />
            )}
          />
        </View>
      )}
      <View style={{position: 'absolute', width: '90%', bottom: 20}}>
        <ButtonStandard
          title="Done"
          disabled={loader}
          loading={loader}
          onPress={onAppointmentBook}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  head: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
