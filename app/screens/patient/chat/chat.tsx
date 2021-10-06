import React from 'react';
import {Text, SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';
import {ChatCard} from '../../../components/ChatCard';
import {GlobalStyles} from '../../../styles/globalStyles';

export const Chat = ({navigation}: any) => {
  function onChatPress() {
    navigation.navigate('Chat Details');
  }
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginBottom: 20}}>
        <Text style={styles.title}>Chat</Text>
      </View>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '90%'}}>
            <ChatCard onPress={onChatPress} />
            <ChatCard onPress={onChatPress} />
            <ChatCard onPress={onChatPress} />
            <ChatCard onPress={onChatPress} />
            <ChatCard onPress={onChatPress} />
            <ChatCard onPress={onChatPress} />
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
