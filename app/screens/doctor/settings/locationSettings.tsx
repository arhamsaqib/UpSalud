import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyText} from '../../../core/text';
import {COLORS} from '../../../colors';
import {BackBtn} from '../../../core/backBtn';
import Geolocation from '@react-native-community/geolocation';
import {ButtonStandard} from '../../../core/button';
import {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {ScrollView} from 'react-native-gesture-handler';

export const PermanentLocationSettings = ({navigation}: any) => {
  const uri = require('../../../assets/images/marker.jpeg');

  const [location, setLocation]: any = useState([]);
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
  async function onSavePress() {}
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          width: '90%',
          marginBottom: 40,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <BackBtn onPress={() => navigation.goBack()} />
        <MyText style={[styles.title, {fontSize: 20}]}>
          Location Settings
        </MyText>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%', marginBottom: 10}}>
            <MyText style={styles.fieldHead}>
              Latitude: {region.latitude ?? ''}
            </MyText>
            <MyText style={styles.fieldHead}>
              Longitude: {region.longitude ?? ''}
            </MyText>
          </View>
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
                onDragEnd={(v: any) => {
                  console.log(v.nativeEvent.coordinate, 'On Drag End');
                  setRegion(v.nativeEvent.coordinate);
                }}
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
        </View>
      </ScrollView>
      <View style={{width: '90%'}}>
        <ButtonStandard title="Save Location" onPress={onSavePress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fieldHead: {
    fontWeight: 'bold',
    letterSpacing: -1,
    color: COLORS.blue,
  },
  opt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
