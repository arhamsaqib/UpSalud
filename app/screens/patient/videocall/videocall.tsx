import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {MenuIcon} from '../../../components/menuIcon';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {TextInputStandard} from '../../../core/textInput';

export const VideoCall = ({navigation}: any) => {
  const [room, setRoom]: any = useState('');
  function OnJoinPress() {
    if (room.length >= 5) {
      navigation.navigate('Join', {roomId: room});
    }
  }
  function OnCreatePress() {
    if (room.length >= 5) {
      navigation.navigate('Call', {roomId: room});
    }
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
        <MenuIcon navigation={navigation} />

        <Text style={styles.head}>Video Call</Text>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <MyText style={{fontWeight: 'bold'}}>Enter Room ID</MyText>

        <TextInputStandard
          style={styles.ti}
          onChangeText={setRoom}
          value={room}
        />
        <MyText style={{fontWeight: 'bold', fontSize: 10}}>
          *Room ID should be atleast 5 digits
        </MyText>
        <View style={{marginBottom: 20}} />
        <ButtonStandard title="Join Room" onPress={OnJoinPress} />
        <ButtonStandard title="Create Room" onPress={OnCreatePress} />
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
  ti: {
    borderWidth: 1,
  },
  head: {
    letterSpacing: -1,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
