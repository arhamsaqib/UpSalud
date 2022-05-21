import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView, Text} from 'react-native';
import {MenuIcon} from '../../../components/menuIcon';
import {GlobalStyles} from '../../../styles/globalStyles';

const Card = () => {
  return (
    <View style={[styles.card, GlobalStyles.elevated_card]}>
      <Text style={styles.head}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </Text>
    </View>
  );
};
const ContactUs = () => {
  return (
    <View style={[styles.card, GlobalStyles.elevated_card]}>
      <Text style={[styles.head, {fontWeight: 'bold'}]}>Phone: +123456789</Text>
      <Text style={[styles.head, {fontWeight: 'bold'}]}>
        Email: abcdef@xyz.com
      </Text>
    </View>
  );
};

export const Help = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          width: '90%',
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MenuIcon navigation={navigation} />

        <Text style={[styles.title, {fontSize: 18}]}>Help</Text>
      </View>
      <View style={{width: '90%'}}>
        <Card />
        <Text
          style={[
            styles.head,
            {fontWeight: 'bold', fontSize: 16, marginTop: 20},
          ]}>
          Contact Us
        </Text>
        <ContactUs />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    padding: 10,
  },
  title: {
    letterSpacing: -1,
    fontWeight: 'bold',
  },
  head: {
    letterSpacing: -1,
    marginVertical: 5,
  },
});
