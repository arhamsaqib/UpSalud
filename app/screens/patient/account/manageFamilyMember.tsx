import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {TextInputStandard} from '../../../core/textInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';
import {GlobalStyles} from '../../../styles/globalStyles';
import {RootStateOrAny, useSelector} from 'react-redux';
import {useState} from 'react';
import {showUserAllFamilyMembers} from '../../../api/familyMembers';
import {useEffect} from 'react';

interface Member {
  // name?: string;
  // relation?: string;
  item: {
    uid: string;
    fname: string;
    lname: string;
    id_number: string;
    dob: string;
    age: string;
    relation: string;
  };
}

interface FieldProps {
  title?: string;
  value?: string;
}

const Field = (props: FieldProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={[styles.head, {color: COLORS.dark_grey}]}>
        {props.title}
      </Text>
      <Text style={[styles.head, {color: COLORS.dark_blue, fontSize: 13}]}>
        {props.value}
      </Text>
    </View>
  );
};

export const Member = (props: Member) => {
  return (
    <TouchableOpacity
      style={[styles.card, GlobalStyles.elevated_card, {marginVertical: 5}]}>
      <Field title="Name" value={props.item.fname + ' ' + props.item.lname} />
      <Field title="Relation" value={props.item.relation} />
      <Field title="ID Number" value={props.item.id_number} />
      <Field title="DOB" value={props.item.dob} />
      <Field title="Age" value={props.item.age} />
      {/* <Text style={[styles.head, {color: COLORS.dark_grey}]}>
        {props.item.fname + ' ' + props.item.lname}
      </Text>
      <Text style={[styles.head, {color: COLORS.dark_blue, fontSize: 13}]}>
        {props.item.relation}
      </Text> */}
    </TouchableOpacity>
  );
};

export const ManageFamilyMembers = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  const [members, setMembers] = useState([]);
  const [loader, setLoader] = useState(false);
  async function FetchAPI() {
    setLoader(true);
    const res = await showUserAllFamilyMembers(state.id).finally(() => {
      setLoader(false);
    });
    setMembers(res);
  }
  useEffect(() => {
    FetchAPI();
  }, []);
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
        {loader && (
          <ActivityIndicator
            color={COLORS.dark_blue}
            style={{marginLeft: 10}}
          />
        )}
      </View>

      <View style={{width: '90%'}}>
        {/* <Member name="John Doe" relation="Father" />
        <Member name="Jane Doe" relation="Mother" />
        <Member name="Alex Mason" relation="Cousin" />
        <Member name="Mark" relation="Cousin" /> */}
        <FlatList
          refreshing={false}
          onRefresh={FetchAPI}
          data={members}
          renderItem={({item, index}: any) => (
            <Member
              // name={item.fname + ' ' + item.lname}
              // relation={item.relation}
              item={item}
            />
          )}
        />
      </View>

      <View style={styles.bottom}>
        <ButtonStandard
          style={{borderWidth: 1, borderColor: COLORS.dark_blue}}
          secondary
          title="Add New"
          onPress={() => navigation.navigate('Add Family Member')}
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
  },
  bottom: {
    width: '90%',
    bottom: 20,
    position: 'absolute',
  },
  card: {
    //alignItems: 'center',
    padding: 10,
    //borderWidth: 1,
    //flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
