import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {TextInputStandard} from '../../../core/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';
import {GlobalStyles} from '../../../styles/globalStyles';

interface Member {
  name?: string;
  relation?: string;
}

export const Member = (props: Member) => {
  return (
    <TouchableOpacity
      style={[styles.card, GlobalStyles.elevated_card, {marginVertical: 5}]}>
      <Text style={[styles.head, {color: COLORS.dark_grey}]}>{props.name}</Text>
      <Text style={[styles.head, {color: COLORS.dark_blue, fontSize: 13}]}>
        {props.relation}
      </Text>
    </TouchableOpacity>
  );
};

export const ManageFamilyMembers = ({navigation}: any) => {
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
        <Text style={styles.title}>Manage Family Members</Text>
      </View>

      <View style={{width: '90%'}}>
        <Member name="John Doe" relation="Father" />
        <Member name="Jane Doe" relation="Mother" />
        <Member name="Alex Mason" relation="Cousin" />
        <Member name="Mark" relation="Cousin" />
        <ButtonStandard
          title="Add New"
          onPress={() => navigation.navigate('Add Family Member')}
        />
      </View>
      {/* <View style={{width: '90%'}}>
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
      </View> */}
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
  card: {
    alignItems: 'center',
    padding: 10,
    //borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
