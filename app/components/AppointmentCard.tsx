import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {showDoctorById} from '../api/doctorAppointment';
import {showUser} from '../api/users';
import {COLORS} from '../colors';
import {GlobalStyles} from '../styles/globalStyles';
import {ConvertDateToObject} from './ConvertDateToObject';

interface DayCard {
  date?: any;
}

const DayCard = (props: DayCard) => {
  const date: any = ConvertDateToObject(props.date);
  return (
    <View style={styles.dayCont}>
      <Text style={styles.eventDesctxt}>{date.date}</Text>
      <Text style={{letterSpacing: -1}}>{date.month}</Text>
    </View>
  );
};

interface TC {
  duration?: string;
  time?: any;
}

const TimeCard = (props: TC) => {
  const t = new Date(props.time);
  const x = ConvertDateToObject(props.time);
  return (
    <View style={styles.timeCard}>
      <Icon
        name="time-outline"
        size={16}
        color={COLORS.text_blue}
        //style={{alignSelf: 'center'}}
      />
      <Text style={{letterSpacing: -1, fontSize: 12}}>
        {t.getHours() + ':' + t.getMinutes() ?? '30'}
      </Text>
      <Text style={[styles.dayText, {marginLeft: 10, fontSize: 13}]}>
        {x.day}
      </Text>
    </View>
  );
};

interface EDC {
  doctor: string;
  reason?: string;
}
const EventDescCard = (props: EDC) => {
  const [doctor, setDoctor]: any = useState([]);
  //console.log(props.doctor, 'Doctor ID');

  async function FetchAPI() {
    const doctord = await showDoctorById({doctor_id: props.doctor});
    //console.log(doctord, 'Doctor Info');

    if (doctord !== undefined) {
      setDoctor(doctord);
    }
  }
  useEffect(() => {
    FetchAPI();
  }, []);
  return (
    <TouchableOpacity style={styles.EDCard}>
      <Text style={styles.eventDesctxt}>Doctor: {doctor.name}</Text>
      <Text style={styles.eventDesctxt}>
        Reason: {props?.reason ?? 'Headache'}
      </Text>
    </TouchableOpacity>
  );
};

interface CEProps {
  date?: string;
  reason?: string;
  status?: string;
  doctor_id: string;
  emergency?: string;
  onPress?(): void;
}

interface Status {
  status?: string;
}

const Status = (props: Status) => {
  const {status} = props;
  return (
    <View
      style={[
        GlobalStyles.elevated_card,
        status === 'cancelled' && styles.cancelled,
        status === 'active' && styles.active,
        status === 'completed' && styles.completed,
        status === 'pending' && styles.pending,
      ]}>
      <Text
        style={{
          letterSpacing: -1,
          fontSize: 13,
          fontWeight: 'bold',
          color: 'white',
        }}>
        {props.status}
      </Text>
    </View>
  );
};

export const AppointmentCard = (props: CEProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.cont}>
      <View style={{width: '30%'}}>
        <DayCard date={props.date} />
      </View>
      <View style={{width: '70%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TimeCard time={props.date} />
          <Status status={props.status} />
        </View>
        <EventDescCard doctor={props.doctor_id} reason={props.reason} />
        {props.emergency?.toString() === '1' && (
          <View
            style={[
              GlobalStyles.elevated_card,
              {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.danger,
              },
            ]}>
            <Text
              style={{letterSpacing: -1, fontWeight: 'bold', color: 'white'}}>
              Emergency
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cont: {
    //borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    //backgroundColor: '#fff',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
  },
  EDCard: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  eventDesctxt: {
    fontWeight: 'bold',
    letterSpacing: -1,
    padding: 5,
  },
  dayCont: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light_blue,
  },
  time: {
    height: 20,
    width: 20,
    borderRadius: 20,
    // backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    //borderWidth: 1,
    marginVertical: 5,
  },
  dayText: {
    color: COLORS.dark_grey,
  },
  cancelled: {
    backgroundColor: COLORS.danger,
  },
  pending: {
    backgroundColor: COLORS.mustard,
  },
  completed: {
    backgroundColor: COLORS.dark_grey,
  },
  active: {
    backgroundColor: COLORS.emerald_green,
  },
});
