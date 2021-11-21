import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';
import {GlobalStyles} from '../../../styles/globalStyles';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  deleteFamilyMember,
  showUserAllFamilyMembers,
} from '../../../api/familyMembers';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface Member {
  item: {
    uid: string;
    fname: string;
    lname: string;
    id_number: string;
    dob: string;
    age: string;
    relation: string;
  };
  onDeletePress?(): void;
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
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={props.onDeletePress} style={styles.delBtn}>
          <Icon name="trash-bin-outline" color="white" size={20} />
        </TouchableOpacity>
      )}>
      <TouchableOpacity
        style={[styles.card, GlobalStyles.elevated_card, {marginVertical: 5}]}>
        <Field title="Name" value={props.item.fname + ' ' + props.item.lname} />
        <Field title="Relation" value={props.item.relation} />
        <Field title="ID Number" value={props.item.id_number} />
        <Field title="DOB" value={props.item.dob} />
        <Field title="Age" value={props.item.age} />
      </TouchableOpacity>
    </Swipeable>
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
  async function onDeleteMember(id: string) {
    const res = await deleteFamilyMember(id).finally(() => {
      FetchAPI();
    });
    console.log(res, 'Delete Response');
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
        <Text style={styles.title}>Manage Family Members</Text>
        {loader && (
          <ActivityIndicator
            color={COLORS.dark_blue}
            style={{marginLeft: 10}}
          />
        )}
      </View>

      <View style={{width: '90%'}}>
        <FlatList
          refreshing={false}
          onRefresh={FetchAPI}
          data={members}
          renderItem={({item, index}: any) => (
            <Member item={item} onDeletePress={() => onDeleteMember(item.id)} />
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
    padding: 10,
    justifyContent: 'space-between',
  },
  delBtn: {
    backgroundColor: COLORS.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    marginLeft: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
});
