import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {TextInputStandard} from '../../../core/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  showUserBasicInformation,
  storeBasicInformation,
} from '../../../api/basicInformation';
import {useEffect} from 'react';
import {COLORS} from '../../../colors';
import auth from '@react-native-firebase/auth';
import {showUser} from '../../../api/users';
import {ConvertDateToObject} from '../../../helpers/convertDateObject';

export const Profile = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const [data, setData]: any = useState([]);
  const [user, setUser]: any = useState([]);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [idnumber, setIdnumber] = useState('');
  const [dob, setDob] = useState('');
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  async function onSavePress() {
    setLoader(true);
    const data = {
      fname: fname,
      lname: lname,
      uid: state.id.toString(),
      dob: dob,
      id_number: idnumber,
    };
    const res = await storeBasicInformation(data).finally(() => {
      setLoader(false);
    });
    //console.log(res, 'Basic information store response');
    Alert.alert('Updated!');
  }
  async function FetchAPI() {
    const uid: any = auth().currentUser?.uid;
    const userI = await showUser(uid);
    if (userI.fuid !== undefined) setUser(userI);

    setLoader(true);
    const res = await showUserBasicInformation(state.id).finally(() => {
      setLoader(false);
    });
    if (res.uid !== undefined) {
      setData(res);
    }
    //console.log(res, 'User Basic info fetched');
  }
  useEffect(() => {
    FetchAPI();
  }, []);
  const dobirth = ConvertDateToObject(data.dob);
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
        {loader && (
          <ActivityIndicator
            style={{marginLeft: 10}}
            color={COLORS.dark_blue}
          />
        )}
      </View>

      <View style={{width: '90%'}}>
        <View style={styles.infoCont}>
          <MyText style={styles.head}>Email</MyText>
          <TextInputStandard defaultValue={user.email} editable={false} />
          <MyText style={styles.head}>First Name</MyText>
          <TextInputStandard
            defaultValue={data.fname}
            onChangeText={setFname}
          />
          <MyText style={styles.head}>Last Name</MyText>
          <TextInputStandard
            defaultValue={data.lname}
            onChangeText={setLname}
          />
          <MyText style={styles.head}>ID Number</MyText>
          <TextInputStandard
            defaultValue={data.id_number}
            onChangeText={setIdnumber}
          />
          <MyText style={styles.head}>Date of Birth</MyText>
          <TextInputStandard
            defaultValue={
              dobirth.date + ' ' + dobirth.month + ' ' + dobirth.year
            }
            editable={false}
            onChangeText={setDob}
          />
        </View>
      </View>
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
    color: COLORS.blue,
  },
  bottom: {
    width: '90%',
    bottom: 20,
    position: 'absolute',
  },
});
