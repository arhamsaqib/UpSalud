import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {RootStateOrAny, useSelector} from 'react-redux';
import {showPatientAllAppointments} from '../../../api/patientAppointments';
import {COLORS} from '../../../colors';
import {AppointmentCard} from '../../../components/AppointmentCard';

export const MyAppointments = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(false);
  console.log(state);
  async function FetchAPI() {
    setLoader(true);
    const apt = await showPatientAllAppointments(state.id).finally(() => {
      setLoader(false);
    });
    setAppointments(apt);
    console.log(apt, ' : Appointments');
  }
  useEffect(() => {
    FetchAPI();
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 20}}>
        <Text style={styles.title}>My Appointments</Text>
      </View>
      {loader && <ActivityIndicator size="small" color={COLORS.dark_blue} />}
      {!loader && (
        <View style={{width: '90%'}}>
          <FlatList
            data={appointments}
            renderItem={({item, index}: any) => (
              <AppointmentCard
                date={item.date}
                reason={item.reason}
                status={item.status}
                doctor_id={item.doctor_id}
                //onPress={() => setSelectedDoctor(item)}
              />
            )}
          />
        </View>
      )}
      {/* <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%'}}>
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
            <AppointmentCard />
          </View>
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
