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
import {FamilyRelation} from '../../../components/RelationsModal';
import {useState} from 'react';
import {COLORS} from '../../../colors';
import {RootStateOrAny, useSelector} from 'react-redux';
import {storeFamilyMember} from '../../../api/familyMembers';
import {Alert} from 'react-native';

export const AddFamilyMember = ({navigation}: any) => {
  const [fmodal, setFModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [relation, setRelation]: any = useState();
  const [fname, setFname]: any = useState('');
  const [lname, setLname]: any = useState('');
  const [idNumber, setIdNumber]: any = useState('');
  const [dob, setDob]: any = useState('');
  const [age, setAge]: any = useState('');
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  async function onSavePress() {
    setLoader(true);
    const data = {
      uid: state.id.toString(),
      fname: fname.toString(),
      lname: lname.toString(),
      relation: relation.toString(),
      age: age.toString(),
      dob: dob.toString(),
      id_number: idNumber.toString(),
    };
    const res = await storeFamilyMember(data).finally(() => {
      setLoader(false);
    });
    console.log(res, 'Save response');
    Alert.alert('Saved!');
    navigation.goBack();
  }

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
        <Text style={styles.head}>Add Family Member</Text>
      </View>

      {/*---------- */}

      <View style={styles.infoCont}>
        <MyText style={styles.title}>Relation</MyText>

        <TouchableOpacity
          style={[styles.relCont]}
          onPress={() => setFModal(true)}>
          <MyText
            style={{
              fontWeight: 'bold',
              letterSpacing: -1,
              color: COLORS.dark_blue,
            }}>
            {relation ?? 'Choose Relation'}
          </MyText>
        </TouchableOpacity>
        <FamilyRelation
          modalVisibility={fmodal}
          onCancelPress={() => setFModal(false)}
          onSelect={setRelation}
        />
        <View style={styles.famRow}>
          <View style={{width: '45%'}}>
            <MyText style={styles.title}>First Name</MyText>
            <TextInputStandard onChangeText={setFname} />
          </View>

          <View style={{width: '45%'}}>
            <MyText style={styles.title}>Last Name</MyText>
            <TextInputStandard onChangeText={setLname} />
          </View>
        </View>
        <View style={styles.famRow}>
          <View style={{width: '45%'}}>
            <MyText style={styles.title}>ID Number</MyText>
            <TextInputStandard onChangeText={setIdNumber} />
          </View>
          <View style={{width: '45%'}}>
            <MyText style={styles.title}>Age</MyText>
            <TextInputStandard
              keyboardType="number-pad"
              onChangeText={setAge}
            />
          </View>
        </View>
        <MyText style={styles.title}>Date of Birth</MyText>
        <TextInputStandard onChangeText={setDob} />
      </View>

      {/*---------- */}

      <View style={styles.bottom}>
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  head: {
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
    width: '90%',
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  bottom: {
    width: '90%',
    bottom: 20,
    position: 'absolute',
  },

  relCont: {
    padding: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 10,
  },
  famRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
