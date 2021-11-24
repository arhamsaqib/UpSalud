import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../colors';
import {ButtonStandard} from '../../../core/button';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyText} from '../../../core/text';
import {DoctorCard} from '../../../components/DoctorCard';
import {useEffect} from 'react';
import {findAllDoctors, findDoctorByGPS} from '../../../api/findDoctorByGPS';
import {FlatList} from 'react-native-gesture-handler';
import {makeAppointment} from '../../../api/appointments';
import {RootStateOrAny, useSelector} from 'react-redux';
import {TextInputStandard} from '../../../core/textInput';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import Toast from 'react-native-toast-message';

export const SelectDoctor = ({navigation, route}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  const [location, setLocation]: any = useState([]);
  const [showMaps, setShowMaps]: any = useState(false);
  const [region, setRegion]: any = useState([]);
  async function onLocationGet() {
    Geolocation.getCurrentPosition(
      info => {
        //console.log(info.coords);

        setLocation(info.coords);
        setRegion(info.coords);
      },
      error => console.warn(error.message, 'Error'),
      {enableHighAccuracy: true},
    );
  }
  async function FetchAPI() {
    if (route.params.appointmentDetails.type === 'online') {
      const res = await findAllDoctors().finally(() => {
        setLoader(false);
      });
      if (res !== undefined) {
        setDoctors(res);
      }
    }
    if (route.params.appointmentDetails.type === 'facetoface') {
      const data = {
        lat: region.latitude,
        lng: region.longitude,
      };

      // const data = {
      //   lat: '31.572808555858092',
      //   lng: '74.2008387',
      // };
      const res = await findDoctorByGPS(data).finally(() => {
        setLoader(false);
      });
      console.log(res, 'Find Doctor By GPS');
      if (res !== undefined) {
        setDoctors(res);
      }
    }
  }
  useEffect(() => {
    setLoader(true);
    onLocationGet();
    FetchAPI();
  }, []);
  const [doctors, setDoctors]: any = useState([]);
  const [selectedDoctor, setSelectedDoctor]: any = useState([]);
  const uri = require('../../../assets/images/marker.jpeg');

  const [loader, setLoader]: any = useState([]);
  async function onAppointmentBook() {
    const details = route.params.appointmentDetails;
    setLoader(true);
    const data = {
      reason: details.reason.toString(),
      emergency: details.emergency,
      uid: state.id.toString(),
      doctor_id: selectedDoctor.doctor_id.toString(),
      status: 'pending',
      date: details.date,
      lat: region.latitude.toString(),
      lng: region.longitude.toString(),
    };
    console.log(data);

    const setApt = await makeAppointment(data).finally(() => setLoader(false));
    console.log(setApt);

    if (setApt.id !== undefined) {
      Alert.alert('Appointment Booked');
      navigation.navigate('Add Appointments Main');
    }
  }
  function onDragEnd(v: any) {
    setRegion(v.nativeEvent.coordinate);
    FetchAPI();
  }

  function disabled() {
    return selectedDoctor.length < 1;
  }

  function locationError() {
    Toast.show({
      type: 'error',
      text1: 'Cant use react-native-maps on release version',
      text2: 'Please purchase Google Maps API key',
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
        <MyText style={[styles.head, {fontSize: 18}]}>Select a Doctor</MyText>
      </View>

      <View
        style={[
          {
            width: '90%',
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <MyText
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.dark_blue,
            letterSpacing: -1,
          }}>
          Type:
        </MyText>
        <MyText
          style={{
            color: COLORS.emerald_green,
            fontWeight: 'bold',
            letterSpacing: -1,
          }}>
          {route.params.appointmentDetails.type === 'facetoface' &&
            'Face To Face'}
          {route.params.appointmentDetails.type === 'online' && 'Online'}
        </MyText>
      </View>

      <View style={[{width: '90%', marginTop: 20}]}>
        <TextInputStandard placeholder="Search Speciality" />
        {route.params.appointmentDetails.type === 'facetoface' && (
          <ButtonStandard
            onPress={locationError}
            //onPress={() => setShowMaps(!showMaps)}
            title={'Switch map view'}
          />
        )}
      </View>
      {route.params.appointmentDetails.type === 'facetoface' && showMaps && (
        <View style={{width: '90%'}}>
          <MapView
            style={{width: '100%', height: 400}}
            //onRegionChange={onRegionChange}
          >
            <Marker
              draggable
              coordinate={{
                latitude: location.latitude,
                longitude: 74.1822552,
                //longitude: location.longitude,
              }}
              onDragEnd={onDragEnd}
              // onDragEnd={(v: any) => {
              //   //console.log(v.nativeEvent.coordinate, 'On Drag End');
              //   setRegion(v.nativeEvent.coordinate);
              // }}
              icon={uri}
            />
          </MapView>
          <ButtonStandard
            title="Get my location"
            onPress={onLocationGet}
            secondary
            style={{borderWidth: 1, borderColor: COLORS.dark_blue}}
          />
        </View>
      )}
      {loader && <ActivityIndicator color={COLORS.dark_blue} size={'small'} />}
      {route.params.appointmentDetails.type === 'facetoface' && (
        <View style={[{width: '90%', marginTop: 20}]}>
          <MyText
            style={{
              color: COLORS.dark_blue,
              fontWeight: 'bold',
              letterSpacing: -1,
            }}>
            Showing doctors in a 100 km radius
          </MyText>
        </View>
      )}
      {doctors.length === 0 && (
        <View
          style={{
            width: '90%',
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MyText
            style={{
              color: COLORS.danger,
              fontWeight: 'bold',
              letterSpacing: -1,
            }}>
            Sorry! We could not find any doctors near you
          </MyText>
        </View>
      )}
      {!loader && (
        <View style={{width: '90%'}}>
          <FlatList
            data={doctors}
            renderItem={({item, index}: any) => (
              <DoctorCard
                selected={selectedDoctor.doctor_id === item.doctor_id}
                onPress={() => setSelectedDoctor(item)}
                doctor_information={item}
              />
            )}
          />
        </View>
      )}
      <View style={{position: 'absolute', width: '90%', bottom: 20}}>
        <ButtonStandard
          title="Done"
          disabled={loader || disabled()}
          loading={loader}
          onPress={onAppointmentBook}
        />
      </View>
      <Toast position="bottom" />
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
