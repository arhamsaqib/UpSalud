import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {RootStateOrAny, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, SafeAreaView} from 'react-native';
import {COLORS} from '../../colors';

export const fChat = ({navigation, route}: any) => {
  const [messages, setMessages]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.CurrentUser);
  const receiverId = route.params.receiverId;

  //   async function getData() {
  //     const docId =
  //       receiverId > state.id
  //         ? state.id + '-' + receiverId
  //         : receiverId + '-' + state.id;
  //     const querySnapshot = await firestore()
  //       .collection('chatrooms')
  //       .doc(docId)
  //       .collection('messages')
  //       .orderBy('createdAt', 'desc')
  //       .get();
  //     const allMessages = querySnapshot.docs.map((docSnap: any) => {
  //       return {
  //         ...docSnap.data(),
  //         createdAt: docSnap.data().createdAt.toDate(),
  //       };
  //     });
  //     setMessages(allMessages);
  //   }
  useEffect(() => {
    // getData();
    const docId =
      receiverId > state.id
        ? state.id + '-' + receiverId
        : receiverId + '-' + state.id;
    const subscribe = firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            let data: any = change.doc.data();
            console.log(data, 'all messages');
            data.createdAt = data?.createdAt?.toDate();
            setMessages((prevMessages: any) =>
              GiftedChat.append(prevMessages, data),
            );
          }
        });
      });
    return () => subscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    // setMessages((previousMessages: any) =>
    //   GiftedChat.append(previousMessages, messages),
    // );

    const msg = messages[0];
    const newMsg = {
      //@ts-ignore
      ...msg,
      sentBy: state.id,
      sentTo: receiverId,
      // createdAt: new Date(),
    };

    console.log(msg, 'On send message');
    const docId =
      receiverId > state.id
        ? state.id + '-' + receiverId
        : receiverId + '-' + state.id;

    firestore()
      .collection('chatrooms')
      .doc(docId)
      .collection('messages')
      .add({...newMsg, createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  return (
    <SafeAreaView style={styles.main}>
      <GiftedChat
        messages={messages}
        //@ts-ignore
        onSend={messages => onSend(messages)}
        renderAvatar={() => null}
        user={{
          _id: state.id,
        }}
        textInputProps={styles.ti}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  ti: {
    // borderWidth: 1,
    padding: 10,
    color: COLORS.blue,
  },
});
