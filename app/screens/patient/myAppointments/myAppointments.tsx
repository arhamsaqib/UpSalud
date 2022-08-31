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
import {CallModal} from '../../../components/callModal';
import {MenuIcon} from '../../../components/menuIcon';

export const MyAppointments = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  const [appointments, setAppointments]: any = useState([]);
  const [loader, setLoader] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  //console.log(state);
  async function FetchAPI() {
    setLoader(true);
    const apt = await showPatientAllAppointments(state.id).finally(() => {
      setLoader(false);
    });
    if (apt !== undefined) {
      setAppointments(apt);
    }
    // console.log(apt, ' : Appointments');
  }
  useEffect(() => {
    FetchAPI();
  }, []);

  function onMakeCall() {
    setCallModal(false);
    navigation.navigate('makeCall', {roomId: roomCode});
  }
  function onReceiveCall() {
    setCallModal(false);
    navigation.navigate('joinCall', {roomId: roomCode});
  }

  return (
    <>
      <SafeAreaView style={styles.main}>
        <View
          style={{
            width: '90%',
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MenuIcon navigation={navigation} />
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
                  emergency={item.emergency}
                  patientId={state.id}
                  onCallPress={(room: string) => {
                    setRoomCode(room);
                    setCallModal(true);
                  }}
                  onChatPress={() =>
                    navigation.navigate('fChat', {receiverId: item.doctor_id})
                  }
                />
              )}
            />
          </View>
        )}
      </SafeAreaView>
      <CallModal
        visible={callModal}
        onCancelPress={() => setCallModal(false)}
        onMakeCall={onMakeCall}
        onReceiveCall={onReceiveCall}
      />
    </>
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
