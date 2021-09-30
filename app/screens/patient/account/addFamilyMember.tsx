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

export const AddFamilyMember = ({navigation}: any) => {
  const [fmodal, setFModal] = useState(false);

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
        <TouchableOpacity
          style={[styles.relCont]}
          onPress={() => setFModal(true)}>
          <MyText
            style={{
              fontWeight: 'bold',
              letterSpacing: -1,
              color: COLORS.dark_blue,
            }}>
            Choose Relation
          </MyText>
        </TouchableOpacity>
        <FamilyRelation
          modalVisibility={fmodal}
          onCancelPress={() => setFModal(false)}
        />
        <View style={styles.famRow}>
          <View style={{width: '45%'}}>
            <MyText style={styles.title}>First Name</MyText>
            <TextInputStandard />
          </View>

          <View style={{width: '45%'}}>
            <MyText style={styles.title}>Last Name</MyText>
            <TextInputStandard />
          </View>
        </View>
        <View style={styles.famRow}>
          <View style={{width: '45%'}}>
            <MyText style={styles.title}>ID Number</MyText>
            <TextInputStandard />
          </View>
          <View style={{width: '45%'}}>
            <MyText style={styles.title}>Age</MyText>
            <TextInputStandard keyboardType="number-pad" />
          </View>
        </View>
        <MyText style={styles.title}>Date of Birth</MyText>
        <TextInputStandard />
      </View>

      {/*---------- */}

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
