import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {ButtonStandard} from '../../../core/button';
import {MyText} from '../../../core/text';
import {TextInputStandard} from '../../../core/textInput';

export const VideoCall = ({navigation}: any) => {
  const [room, setRoom]: any = useState('');
  return (
    <SafeAreaView style={styles.main}>
      <View style={{width: '90%', marginTop: 10}}>
        <MyText style={{fontWeight: 'bold'}}>Enter Room ID</MyText>

        <TextInputStandard
          style={styles.ti}
          onChangeText={setRoom}
          value={room}
        />
        <View style={{marginBottom: 20}} />
        <ButtonStandard
          title="Join Room"
          onPress={() => navigation.navigate('Join', {roomId: room})}
        />
        <ButtonStandard
          title="Create Room"
          onPress={() => navigation.navigate('Call', {roomId: room})}
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
  ti: {
    borderWidth: 1,
  },
});
