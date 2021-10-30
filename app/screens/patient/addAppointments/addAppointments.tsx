import React from 'react';
import {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../colors';
import {ButtonStandard} from '../../../core/button';
import {TextInputStandard} from '../../../core/textInput';
import {GlobalStyles} from '../../../styles/globalStyles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {ConvertDateToObject} from '../../../components/ConvertDateToObject';
import {MyText} from '../../../core/text';

interface TOA {
  selected?: boolean;
  title?: string;
  onPress?(): void;
}

const TOA = (props: TOA) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.toaCont, props.selected && styles.toaSelected]}>
      <MyText style={[{fontWeight: 'bold', color: 'black'}, {color: 'white'}]}>
        {props.title}
      </MyText>
    </TouchableOpacity>
  );
};

export const AddAppointments = ({navigation}: any) => {
  const [emergency, setEmergency] = useState(false);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');

  function onNext() {
    navigation.navigate('Select Doctor', {
      appointmentDetails: {
        emergency: emergency,
        reason: reason,
        date: date,
      },
    });
  }
  const handleConfirm = (date: Date) => {
    setDate(date);
    setShow(false);
  };

  const selectedDate = ConvertDateToObject(date.toString());

  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%'}}>
        <Text style={styles.head}>Add Appointments</Text>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={[{width: '90%', marginTop: 20}]}>
            <Text style={[styles.head, {fontSize: 15, marginBottom: 10}]}>
              Reason
            </Text>
            <TextInputStandard
              onChangeText={setReason}
              multiline
              style={{padding: 10, height: 200, borderLeftWidth: 1}}
            />
          </View>
          <View style={[{width: '90%', marginTop: 20}]}>
            <Text style={[styles.head, {fontSize: 15, marginBottom: 10}]}>
              Is it an emergency?
            </Text>
            <ButtonStandard
              onPress={() => setEmergency(!emergency)}
              textStyle={[
                emergency && {color: 'white'},
                !emergency && {color: COLORS.dark_blue},
              ]}
              style={[
                !emergency && {
                  borderWidth: 1,
                  borderColor: COLORS.dark_blue,
                  backgroundColor: 'white',
                },
                emergency && {backgroundColor: COLORS.danger},
              ]}
              title="Emergency"
            />
          </View>
          <View style={[{width: '90%', marginTop: 20}]}>
            <Text style={[styles.head, {fontSize: 15}]}>Date:</Text>
            <Text style={[styles.head, {fontSize: 15, color: COLORS.green}]}>
              {selectedDate.date +
                ' ' +
                selectedDate.month +
                ' ' +
                selectedDate.year +
                ' ' +
                selectedDate.day}
            </Text>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={[
                GlobalStyles.elevated_card,
                {alignItems: 'center', backgroundColor: COLORS.light_blue},
              ]}>
              <Text
                style={[styles.head, {fontSize: 15, color: COLORS.text_blue}]}>
                Pick a date
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={show}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setShow(false)}
          />
          <View style={{width: '90%'}}>
            <Text style={[styles.head, {fontSize: 15}]}>
              Type of appointment:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{width: '48%'}}>
                <TOA
                  title="Face to face"
                  onPress={() => setType('facetoface')}
                  selected={type === 'facetoface' && true}
                />
              </View>
              <View style={{width: '48%'}}>
                <TOA
                  title="Online"
                  onPress={() => setType('online')}
                  selected={type === 'online' && true}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{width: '90%'}}>
        <ButtonStandard title="Next" onPress={onNext} />
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
  toaCont: {
    height: 40,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#222222',
  },
  toaSelected: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
});
