import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../colors';

const DayCard = () => {
  return (
    <View style={styles.dayCont}>
      <Text style={styles.eventDesctxt}>24th</Text>
      <Text style={{letterSpacing: -1}}>Sep</Text>
    </View>
  );
};

interface TC {
  duration?: string;
}

const TimeCard = (props: TC) => {
  return (
    <View style={styles.timeCard}>
      <Icon
        name="time-outline"
        size={16}
        color={COLORS.text_blue}
        //style={{alignSelf: 'center'}}
      />
      <Text style={{letterSpacing: -1, fontSize: 12}}>
        {props.duration ?? '30'} mins
      </Text>
      <Text style={[styles.dayText, {marginLeft: 10, fontSize: 13}]}>
        Friday
      </Text>
    </View>
  );
};

interface EDC {
  doctor?: string;
  reason?: string;
}
const EventDescCard = (props: EDC) => {
  return (
    <TouchableOpacity style={styles.EDCard}>
      <Text style={styles.eventDesctxt}>
        Doctor: {props?.doctor ?? 'John Doe'}
      </Text>
      <Text style={styles.eventDesctxt}>
        Reason: {props?.reason ?? 'Headache'}
      </Text>
    </TouchableOpacity>
  );
};

interface CEProps {
  date?: string;
  desc?: string;
}

export const AppointmentCard = (props: CEProps) => {
  return (
    <View style={styles.cont}>
      <View style={{width: '30%'}}>
        <DayCard />
      </View>
      <View style={{width: '70%'}}>
        <TimeCard />
        <EventDescCard />
      </View>
    </View>
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
    height: 50,
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
});
