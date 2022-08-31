import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../colors';
import {MyText} from '../core/text';

interface Props {
  onPress?(): void;
  disabled?: boolean;
}

export const EndCallButton = (props: Props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={[
        {
          height: 70,
          width: 70,
          borderRadius: 40,
          backgroundColor: COLORS.danger,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Icon name="call-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};
export const StartCallButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          height: 70,
          width: 70,
          borderRadius: 40,
          backgroundColor: COLORS.mustard,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.disabled && {backgroundColor: 'grey'},
      ]}>
      <MyText
        style={{
          fontSize: 13,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {props.disabled ? 'Call Started' : 'Start Call'}
      </MyText>
    </TouchableOpacity>
  );
};
export const JoinCallButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          height: 70,
          width: 70,
          borderRadius: 40,
          backgroundColor: COLORS.mustard,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.disabled && {backgroundColor: 'grey'},
      ]}>
      <MyText
        style={{
          fontSize: 13,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        {props.disabled ? 'Call Joined' : 'Join Call'}
      </MyText>
    </TouchableOpacity>
  );
};
export const SwitchCameraButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          height: 70,
          width: 70,
          borderRadius: 40,
          backgroundColor: COLORS.dark_grey,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Icon name="camera-reverse-outline" size={30} color="white" />
    </TouchableOpacity>
  );
};
export const MuteButton = (props: {onPress?(): void; isMuted?: boolean}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        {
          height: 70,
          width: 70,
          borderRadius: 40,
          backgroundColor: COLORS.dark_grey,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      {props.isMuted ? (
        <Icon name="mic-off-outline" size={30} color="white" />
      ) : (
        <Icon name="mic-outline" size={30} color="white" />
      )}
    </TouchableOpacity>
  );
};
