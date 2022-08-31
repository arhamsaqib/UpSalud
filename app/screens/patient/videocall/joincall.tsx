import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Button, View, SafeAreaView} from 'react-native';
import InCallManager from 'react-native-incall-manager';

import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCIceCandidate,
  RTCSessionDescription,
} from 'react-native-webrtc';
import {COLORS} from '../../../colors';
import {
  EndCallButton,
  JoinCallButton,
  MuteButton,
  SwitchCameraButton,
} from '../../../components/endCallBtn';
import {MyText} from '../../../core/text';
import {db} from './firebase';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default function JoinScreen({navigation, route}: any) {
  const {roomId} = route.params;
  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
    // cleanup
    navigation.goBack();
  }

  const [localStream, setLocalStream]: any = useState();
  const [remoteStream, setRemoteStream]: any = useState();
  const [cachedLocalPC, setCachedLocalPC]: any = useState();
  const [callStarted, setCallStarted]: any = useState('');
  const [waiting, setWaiting]: any = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    // isFront will determine if the initial camera should face user or environment
    const isFront = true;
    const devices: any = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'environment';
    const videoSourceId = devices.find(
      (device: any) => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const joinCall = async (id: any) => {
    const roomRef = await db.collection('rooms').doc(id);
    const roomSnapshot: any = await roomRef.get();

    if (!roomSnapshot.exists) return;
    const localPC = new RTCPeerConnection(configuration);
    localPC.addStream(localStream);

    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    localPC.onicecandidate = (e: any) => {
      if (!e.candidate) {
        console.log('Got final candidate!');
        return;
      }
      InCallManager.setSpeakerphoneOn(true);
      calleeCandidatesCollection.add(e.candidate.toJSON());
    };

    localPC.onaddstream = (e: any) => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream join', e.stream);
        setRemoteStream(e.stream);
      }
    };

    const offer: any = roomSnapshot.data().offer;
    await localPC.setRemoteDescription(new RTCSessionDescription(offer));

    const answer: any = await localPC.createAnswer();
    await localPC.setLocalDescription(answer);

    const roomWithAnswer = {answer};
    await roomRef.update(roomWithAnswer);

    roomRef.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setCachedLocalPC(localPC);
  };

  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track: any) => track._switchCamera());
  };

  // Mutes the local's outgoing audio
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach((track: any) => {
      // console.log(track.enabled ? 'muting' : 'unmuting', ' local track', track);
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.old_blue,
      }}>
      <View
        style={{
          width: '100%',
          height: '10%',
        }}>
        <SafeAreaView style={{alignItems: 'center'}}>
          <MyText
            style={{fontSize: 16, fontWeight: 'bold', color: COLORS.green}}>
            Join Call Room
          </MyText>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.emerald_green,
              marginVertical: 3,
              fontWeight: 'bold',
            }}>
            Room ID: {roomId}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: 'white',
              marginVertical: 3,
              fontWeight: 'bold',
            }}>
            {!remoteStream ? 'Waiting for people to join' : 'Call in progress'}
          </Text>
        </SafeAreaView>
      </View>
      {/*

    <View style={styles.callButtons}>
      <View style={styles.buttonContainer}>
        <Button title="Click to stop call" onPress={onBackPress} />
      </View>
      <View style={styles.buttonContainer}>
        {!localStream && (
          <Button title="Click to start stream" onPress={startLocalStream} />
        )}
        {localStream && (
          <Button
            title="Click to start call"
            onPress={() => startCall(roomId)}
            disabled={!!remoteStream}
          />
        )}
      </View>
    </View>

    {localStream && (
      <View style={styles.toggleButtons}>
        <Button title="Switch camera" onPress={switchCamera} />
        <Button
          title={`${isMuted ? 'Unmute' : 'Mute'} stream`}
          onPress={toggleMute}
          disabled={!remoteStream}
        />
      </View>
    )} */}
      <View style={{width: '100%', height: '65%'}}>
        <View style={[styles.rtcviewRemote]}>
          {remoteStream && (
            <RTCView
              //@ts-ignore
              style={styles.rtc}
              streamURL={remoteStream && remoteStream.toURL()}
            />
          )}
        </View>
      </View>
      <View style={[styles.rtcviewLocal]}>
        {localStream && (
          <RTCView
            //@ts-ignore
            style={styles.local}
            streamURL={localStream && localStream.toURL()}
          />
        )}
      </View>
      <View
        style={{
          height: '15%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <EndCallButton onPress={onBackPress} />
          <JoinCallButton
            onPress={() => joinCall(roomId)}
            disabled={!!remoteStream}
          />
          <SwitchCameraButton onPress={switchCamera} />
          <MuteButton isMuted={isMuted} onPress={toggleMute} />
        </View>
      </View>
    </View>
  );

  // return (
  //   <>
  //     <Text style={styles.heading}>Join Screen</Text>
  //     <Text style={styles.heading}>Room : {roomId}</Text>

  //     <View style={styles.callButtons}>
  //       <View style={styles.buttonContainer}>
  //         <Button title="Click to stop call" onPress={onBackPress} />
  //       </View>
  //       <View style={styles.buttonContainer}>
  //         {!localStream && (
  //           <Button title="Click to start stream" onPress={startLocalStream} />
  //         )}
  //         {localStream && (
  //           <Button
  //             title="Click to join call"
  //             onPress={() => joinCall(roomId)}
  //             disabled={!!remoteStream}
  //           />
  //         )}
  //       </View>
  //     </View>

  //     {localStream && (
  //       <View style={styles.toggleButtons}>
  //         <Button title="Switch camera" onPress={switchCamera} />
  //         <Button
  //           title={`${isMuted ? 'Unmute' : 'Mute'} stream`}
  //           onPress={toggleMute}
  //           disabled={!remoteStream}
  //         />
  //       </View>
  //     )}

  //     <View style={{display: 'flex', flex: 1, padding: 10}}>
  //       <View style={styles.rtcview}>
  //         {localStream && (
  //           <RTCView
  //             style={styles.rtc}
  //             streamURL={localStream && localStream.toURL()}
  //           />
  //         )}
  //       </View>
  //       <View style={styles.rtcview}>
  //         {remoteStream && (
  //           <RTCView
  //             style={styles.rtc}
  //             streamURL={remoteStream && remoteStream.toURL()}
  //           />
  //         )}
  //       </View>
  //     </View>
  //   </>
  // );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
  },
  rtcviewLocal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    width: '20%',
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  rtcviewRemote: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark_grey,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  rtc: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  local: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  toggleButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  callButtons: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    margin: 5,
  },
});

// const styles = StyleSheet.create({
//   heading: {
//     alignSelf: 'center',
//     fontSize: 30,
//   },
//   rtcview: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//     margin: 5,
//   },
//   rtc: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   toggleButtons: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   callButtons: {
//     padding: 10,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   buttonContainer: {
//     margin: 5,
//   },
// });
