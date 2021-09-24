import React from 'react';
import {useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../colors';
import {ButtonStandard} from '../../../core/button';
import {TextInputStandard} from '../../../core/textInput';
import {GlobalStyles} from '../../../styles/globalStyles';

export const AddAppointments = ({navigation}: any) => {
  const [emergency, setEmergency] = useState(false);
  function onNext() {
    navigation.navigate('Select Doctor');
  }
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%'}}>
        <Text style={styles.head}>Add Appointments</Text>
      </View>

      <View style={[{width: '90%', marginTop: 20}]}>
        <Text style={[styles.head, {fontSize: 15, marginBottom: 10}]}>
          Reason
        </Text>
        <TextInputStandard
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
        <TouchableOpacity
          style={[
            GlobalStyles.elevated_card,
            {alignItems: 'center', backgroundColor: COLORS.light_blue},
          ]}>
          <Text style={[styles.head, {fontSize: 15, color: COLORS.text_blue}]}>
            Pick a date
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', width: '90%', bottom: 20}}>
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
});
