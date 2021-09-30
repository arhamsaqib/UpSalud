import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import {MedicalRecordCard} from '../../../components/Record';
import {TextInputStandard} from '../../../core/textInput';

export const MedicalRecords = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 20}}>
        <Text style={styles.title}>Medical Records</Text>
        <View
          style={{
            width: '100%',
            marginVertical: 10,
          }}>
          <TextInputStandard style={{borderWidth: 1}} placeholder={'Search'} />
        </View>
      </View>

      <View style={{width: '90%'}}>
        <MedicalRecordCard
          onPress={() => navigation.navigate('Record Details')}
        />
        <MedicalRecordCard
          onPress={() => navigation.navigate('Record Details')}
        />
        <MedicalRecordCard
          onPress={() => navigation.navigate('Record Details')}
        />
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
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
