import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../colors';
import {GlobalStyles} from '../../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextInputStandard} from '../../../core/textInput';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const SendButton = () => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles.bottomBar}>
      <View style={styles.ti}>
        <TextInputStandard
          style={{borderWidth: 1}}
          placeholder="Write a message"
        />
      </View>
      <TouchableOpacity
        style={[styles.send, GlobalStyles.elevated_card, {marginVertical: 0}]}>
        <Icon name="send" color={COLORS.dark_blue} size={15} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    width: '90%',
    flexDirection: 'row',
    // alignItems: 'baseline',
    justifyContent: 'space-between',
    //borderWidth: 1,
    //padding: 5,
    // position: 'absolute',
    bottom: 20,
  },
  send: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderWidth: 1,
    height: 40,
    padding: 5,
    borderRadius: 5,
  },
  ti: {
    width: '89%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
