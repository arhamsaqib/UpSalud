import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {TextInputStandard} from '../../../core/textInput';
import Icon from 'react-native-vector-icons/Ionicons';

export const Profile = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          width: '90%',
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          name="arrow-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={{width: '90%'}}>
        <View style={styles.infoCont}>
          <MyText style={styles.head}>Email</MyText>
          <TextInputStandard />
          <MyText style={styles.head}>First Name</MyText>
          <TextInputStandard />
          <MyText style={styles.head}>Last Name</MyText>
          <TextInputStandard />
          <MyText style={styles.head}>ID Number</MyText>
          <TextInputStandard />
          <MyText style={styles.head}>Date of Birth</MyText>
          <TextInputStandard />
        </View>
      </View>
      <View style={styles.bottom}>
        <ButtonStandard title="Save" />
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
  head: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  bottom: {
    width: '90%',
    bottom: 20,
    position: 'absolute',
  },
});
