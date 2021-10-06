import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';
import {GlobalStyles} from '../../../styles/globalStyles';

export const RecordDetails = ({navigation}: any) => {
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
        <Text style={styles.title}>Record Details</Text>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={[{width: '90%', marginTop: 20}, styles.field]}>
            <Text style={styles.head}>Date: </Text>
            <Text style={styles.value}>Aug 12 2021</Text>
          </View>
          <View style={[{width: '90%', marginTop: 20}, styles.field]}>
            <Text style={styles.head}>Doctor: </Text>
            <Text style={styles.value}>John Doe</Text>
          </View>
          <View style={[{width: '90%', marginTop: 20}, styles.field]}>
            <Text style={styles.head}>Reason: </Text>
            <Text style={styles.value}>Headache</Text>
          </View>
          <View style={[{width: '90%', marginTop: 20}]}>
            <Text style={styles.head}>Prescription </Text>
            <View style={[GlobalStyles.elevated_card]}>
              <Text style={[styles.field]}>
                Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
              </Text>
            </View>
          </View>
          <View style={[{width: '90%', marginTop: 20}]}>
            <Text style={styles.head}>Notes </Text>
            <View style={[GlobalStyles.elevated_card]}>
              <Text style={styles.field}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  head: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 17,
    color: COLORS.dark_blue,
    width: '30%',
  },
  value: {
    letterSpacing: -1,
    fontSize: 15,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
