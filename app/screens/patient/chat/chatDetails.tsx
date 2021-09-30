import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';
import {TextInputStandard} from '../../../core/textInput';
import {GlobalStyles} from '../../../styles/globalStyles';
import {Platform} from 'react-native';

export const ChatDetails = ({navigation}: any) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;

  function onCallPress() {
    Alert.alert('Calling...');
  }
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <SafeAreaView style={[styles.safeArea, {width: '20%'}]}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={20}
            color={COLORS.dark_blue}
          />
        </SafeAreaView>
        <SafeAreaView style={[styles.safeArea, {width: '60%'}]}>
          <Text style={styles.name}>Arham Saqib</Text>
        </SafeAreaView>
        <SafeAreaView style={[styles.safeArea, {width: '20%'}]}>
          <Icon
            onPress={onCallPress}
            name="call-outline"
            size={20}
            color={COLORS.dark_blue}
          />
        </SafeAreaView>
      </View>
      {/*
      
         Chat Starts here
        
      */}
      <ScrollView style={{marginBottom: 20}}></ScrollView>
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
          style={[
            styles.send,
            GlobalStyles.elevated_card,
            {marginVertical: 0},
          ]}>
          <Icon name="send" color={COLORS.dark_blue} size={15} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    height: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 20,
    borderRadius: 1,
    backgroundColor: COLORS.light_blue,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  safeArea: {
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
  },
  name: {
    letterSpacing: -1,
    fontWeight: 'bold',
    color: COLORS.dark_blue,
    fontSize: 19,
  },
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
