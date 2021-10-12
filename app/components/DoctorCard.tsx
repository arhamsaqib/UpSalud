import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
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
}

export const DoctorCard = (props: DoctorCardProps) => {
  const {style, ...rest} = props;
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
        <Field name="Name" value={'Dr. ' + props.name} />
        {/* <Field name="Specialist" value="Heart Specialist" /> */}
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
