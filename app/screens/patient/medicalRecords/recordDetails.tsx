import React from 'react';
import {Text, SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
});
