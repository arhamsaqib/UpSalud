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

export const SelectDoctor = ({navigation}: any) => {
  async function FetchAPI() {
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
  const [loader, setLoader]: any = useState([]);
  function onAppointmentBook() {
    Alert.alert('Appointment Requested');
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
            renderItem={({item, index}: any) => <DoctorCard name={item.name} />}
          />
        </View>
      )}
      <View style={{position: 'absolute', width: '90%', bottom: 20}}>
        <ButtonStandard title="Done" onPress={onAppointmentBook} />
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
