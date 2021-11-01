import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {showDoctorById, showDoctors} from '../api/showDoctors';
import {COLORS} from '../colors';

interface FieldProps {
  name?: string;
  value?: string;
}

const Field = (props: FieldProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
        justifyContent: 'space-between',
      }}>
      <Text style={{fontWeight: 'bold', letterSpacing: -1, width: '30%'}}>
        {props.name}:{' '}
      </Text>
      <Text style={{fontSize: 16, letterSpacing: -1, width: '65%'}}>
        {props.value}
      </Text>
    </View>
  );
};

interface DoctorCardProps extends TouchableOpacityProps {
  name?: string;
  selected?: boolean;
  doctor_information: {
    permanent_lat?: string;
    permanent_lng?: string;
    speciality?: string;
    distance?: string;
    doctor_id: string;
  };
}

export const DoctorCard = (props: DoctorCardProps) => {
  const {style, ...rest} = props;
  const [info, setInfo]: any = useState([]);
  async function FetchAPI() {
    const data = await showDoctorById({
      doctor_id: props.doctor_information.doctor_id,
    });
    if (data.id !== undefined) {
      setInfo(data);
    }
  }
  //console.log(props.doctor_information, 'Doctor Infotmaiton');
  useEffect(() => {
    FetchAPI();
  }, []);

  return (
    <TouchableOpacity
      {...rest}
      style={[
        style,
        styles.main,
        props.selected && {backgroundColor: COLORS.blue},
      ]}>
      <View style={{width: '25%', alignItems: 'center'}}>
        <Image
          style={{
            height: 70,
            width: 70,
            borderRadius: 70,
            borderWidth: 1,
            borderColor: COLORS.dark_blue,
          }}
          source={require('../assets/images/doctor.jpeg')}
        />
      </View>
      <View style={{width: '73%'}}>
        <Field name="Name" value={'Dr. ' + info.name} />
        <Field name="Specialist" value={props.doctor_information.speciality} />
        <Field
          name="Distance"
          value={
            (props.doctor_information.distance &&
              (
                Math.round(
                  parseFloat(props.doctor_information.distance) * 100,
                ) / 100
              ).toFixed(2) + ' km') ??
            'NA'
          }
          //value={props.doctor_information.distance?.fixed(2)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    minHeight: 90,
    borderWidth: 0.5,
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLORS.light_blue,
    //backgroundColor: COLORS.light_blue,
  },
});
