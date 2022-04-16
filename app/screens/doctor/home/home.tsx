import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {showDoctorAllAppointments} from '../../../api/doctorAppointment';
import {COLORS} from '../../../colors';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {GlobalStyles} from '../../../styles/globalStyles';
import {showPatientById} from '../../../api/patientAppointments';
import {useEffect} from 'react';
import {ConvertDateToObject} from '../../../components/ConvertDateToObject';
import {updateAppointment} from '../../../api/appointments';

interface RequestCardP {
  reason?: string;
  date?: any;
  location?: string;
  emergency?: string;
  patient_id: string;
  onAcceptPress?(): void;
  onRejectPress?(): void;
  status?: string;
  onPress?(): void;
  onChatPress?(): void;
}

const RequestCard = (props: RequestCardP) => {
  const [patient, setPatient]: any = useState([]);
  async function FetchAPI() {
    const data = await showPatientById({patient_id: props.patient_id});
    if (data !== undefined) {
      setPatient(data);
    }
    //console.log(data, 'Patient Data');
  }
  useEffect(() => {
    FetchAPI();
  }, []);
  const date = ConvertDateToObject(props.date);
  const d: Date = new Date(props.date);

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[GlobalStyles.elevated_card, {marginBottom: 10}]}>
      <View
        style={[
          styles.field,
          {alignItems: 'center', justifyContent: 'flex-start'},
        ]}>
        <MyText style={[styles.name]}>{patient.name} </MyText>
        <MyText style={[styles.name, {fontWeight: '200'}]}>
          needs your attention!
        </MyText>
      </View>
      <View style={styles.field}>
        <MyText style={[styles.fieldHead]}>Location: </MyText>
        <MyText style={[{fontWeight: '300'}]}>
          {props.location ?? '123 XYZ Street'}
        </MyText>
      </View>
      <View style={styles.field}>
        <MyText style={[styles.fieldHead]}>Reason: </MyText>
        <MyText style={[{fontWeight: '300'}]}>{props.reason}</MyText>
      </View>
      <View style={styles.field}>
        <MyText style={[styles.fieldHead]}>Time: </MyText>
        <MyText style={[{fontWeight: '300'}]}>
          {d.getHours() + ':' + d.getMinutes()} |{' '}
          {date.month + ' ' + date.date + ' ' + date.year + ' ' + date.day}
        </MyText>
      </View>
      {props.emergency?.toString() === '1' && (
        <View
          style={[
            GlobalStyles.elevated_card,
            {backgroundColor: COLORS.danger, alignItems: 'center'},
          ]}>
          <MyText style={{color: 'white', fontWeight: 'bold'}}>
            Emergency
          </MyText>
        </View>
      )}

      {props.status === 'pending' && (
        <View style={[styles.field, {justifyContent: 'space-between'}]}>
          <View style={{width: '49%'}}>
            <ButtonStandard
              title="Accept"
              style={{backgroundColor: COLORS.emerald_green}}
              onPress={props.onAcceptPress}
            />
          </View>
          <View style={{width: '49%'}}>
            <ButtonStandard
              title="Reject"
              style={{backgroundColor: COLORS.danger}}
              onPress={props.onRejectPress}
            />
          </View>
        </View>
      )}
      {props.status === 'active' && (
        <ButtonStandard
          disabled
          title="Accepted"
          style={{backgroundColor: COLORS.emerald_green}}
        />
      )}
      {props.status === 'active' && (
        <ButtonStandard
          title="Chat"
          style={{backgroundColor: COLORS.green}}
          onPress={props.onChatPress}
        />
      )}
      {props.status === 'cencelled' && (
        <ButtonStandard
          disabled
          title="Rejected"
          style={{backgroundColor: COLORS.light_blue}}
        />
      )}
    </TouchableOpacity>
  );
};

export const DoctorHome = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(false);
  async function FetchAPI() {
    setLoader(true);
    const data = await showDoctorAllAppointments(state.id).finally(() =>
      setLoader(false),
    );
    if (data !== undefined) {
      setAppointments(data);
    }
  }
  useEffect(() => {
    FetchAPI();
  }, []);
  async function onAcceptPress(id: string) {
    const status = 'active';
    const update = await updateAppointment(id, {status: status}).finally(() => {
      FetchAPI();
    });
    //console.log(update, 'Update');
  }
  async function onRejectPress(id: string) {
    const status = 'cancelled';
    const update = await updateAppointment(id, {status: status}).finally(() => {
      FetchAPI();
    });
    // console.log(update, 'Update');
  }
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 40}}>
        <MyText style={[styles.title, {fontSize: 20}]}>Home</MyText>
      </View>
      {loader && <ActivityIndicator color={COLORS.dark_blue} size="small" />}
      {!loader && (
        <View style={{width: '90%'}}>
          <FlatList
            data={appointments}
            style={{marginBottom: 40}}
            renderItem={({item, index}: any) => (
              <View>
                <RequestCard
                  patient_id={item.uid}
                  reason={item.reason}
                  date={item.date}
                  emergency={item.emergency}
                  status={item.status}
                  onAcceptPress={() => onAcceptPress(item.id)}
                  onRejectPress={() => onRejectPress(item.id)}
                  onChatPress={() =>
                    navigation.navigate('fChat', {receiverId: item.uid})
                  }
                />
              </View>
            )}
          />
        </View>
      )}
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
    width: '35%',
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  name: {
    //width: '35%',
    fontWeight: 'bold',
    fontSize: 25,
    letterSpacing: -1,
  },
});
