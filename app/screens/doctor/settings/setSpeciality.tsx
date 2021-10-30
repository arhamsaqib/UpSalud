import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  saveDoctorInformation,
  showDoctorInformationById,
} from '../../../api/doctorLocation';
import {COLORS} from '../../../colors';
import {BackBtn} from '../../../core/backBtn';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {TextInputStandard} from '../../../core/textInput';

export const SetSpeciality = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  const [speciality, setSpeciality] = useState('');
  const [data, setData]: any = useState([]);
  const [loader, setLoader] = useState(false);
  async function FetchAPI() {
    setLoader(true);
    const res = await showDoctorInformationById(state.id).finally(() =>
      setLoader(false),
    );
    if (res.doctor_id !== undefined) {
      setData(res);
    }
    console.log(res, 'Doctor Data');
  }
  async function onSavePress() {
    setLoader(true);
    const dataS = {
      doctor_id: state.id.toString(),
      permanent_lat: data.permanent_lat.toString(),
      permanent_lng: data.permanent_lng.toString(),
      speciality: speciality,
    };

    const save = await saveDoctorInformation(dataS).finally(() => {
      setLoader(false);
    });
    console.log(save, 'Location Update Status');
    Alert.alert('Saved!');
    navigation.goBack();
  }
  useEffect(() => {
    FetchAPI();
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          width: '90%',
          marginBottom: 40,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <BackBtn onPress={() => navigation.goBack()} />
        <MyText style={[styles.title, {fontSize: 20}]}>Speciality</MyText>
        {loader && (
          <ActivityIndicator
            style={{marginLeft: 10}}
            color={COLORS.dark_blue}
            size={'small'}
          />
        )}
      </View>
      <View style={{width: '90%'}}>
        <MyText style={styles.fieldHead}>What do you specialize in?</MyText>
        <TextInputStandard
          defaultValue={data.speciality}
          placeholder="Enter speciality"
          style={{borderWidth: 1}}
          onChangeText={setSpeciality}
        />
      </View>
      <View style={{width: '90%', position: 'absolute', bottom: 20}}>
        <ButtonStandard
          title="Save"
          onPress={onSavePress}
          loading={loader}
          disabled={loader}
        />
      </View>
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
    fontWeight: 'bold',
    letterSpacing: -1,
    color: COLORS.blue,
  },
  opt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
