import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {COLORS} from '../../colors';
import {MyText} from '../../core/text';
import {TextInputStandard} from '../../core/textInput';
import {ButtonStandard} from '../../core/button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';

export const Forget = ({navigation}: any) => {
  function onContinue() {
    Alert.alert('Password Successfully Reset!');
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="arrow-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.title, {fontSize: 18}]}>Forget Password</Text>
      </View>
      <View style={{width: '90%'}}>
        <View style={styles.infoCont}>
          <MyText style={styles.title}>Email</MyText>
          <TextInputStandard />
        </View>
      </View>
      <View style={{width: '90%'}}>
        <ButtonStandard title="Reset" onPress={onContinue} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.new_blue,
  },
  infoCont: {
    //borderWidth: 1,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
});
