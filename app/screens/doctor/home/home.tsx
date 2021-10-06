import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../colors';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {GlobalStyles} from '../../../styles/globalStyles';

interface RequestCardP {
  reason?: string;
  name?: string;
  time?: string;
  date?: string;
  location?: string;
  emergency?: boolean;
}

const RequestCard = (props: RequestCardP) => {
  return (
    <TouchableOpacity style={[GlobalStyles.elevated_card, {marginBottom: 10}]}>
      <View
        style={[
          styles.field,
          {alignItems: 'center', justifyContent: 'flex-start'},
        ]}>
        <MyText style={[styles.name]}>{props.name ?? 'Joe'} </MyText>
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
          {props.time} | {props.date}
        </MyText>
      </View>
      {props.emergency && (
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
      <View style={[styles.field, {justifyContent: 'space-between'}]}>
        <View style={{width: '49%'}}>
          <ButtonStandard
            title="Accept"
            style={{backgroundColor: COLORS.emerald_green}}
          />
        </View>
        <View style={{width: '49%'}}>
          <ButtonStandard
            title="Reject"
            style={{backgroundColor: COLORS.danger}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const DoctorHome = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 40}}>
        <MyText style={[styles.title, {fontSize: 20}]}>Home</MyText>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%'}}>
            <MyText style={styles.title}>New Requests</MyText>
            <RequestCard
              name="John"
              reason="Blood loss"
              time="03:00 pm"
              date="Oct 7 2021"
            />
            <RequestCard
              name="Zoey"
              reason="fever"
              time="03:00 pm"
              date="Oct 7 2021"
            />
            <RequestCard
              name="Mark"
              reason="Severe Blood Loss"
              time="03:00 pm"
              date="Oct 7 2021"
              emergency
            />
          </View>
        </View>
      </ScrollView>
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
