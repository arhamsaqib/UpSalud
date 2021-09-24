import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerItemList} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../colors';
import {Avatar} from '../../../components/avatar';
import {MyText} from '../../../core/text';
export const CustomDrawer = (props: any) => {
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.header}>
        <View
          style={{
            width: '90%',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={props.navigation.closeDrawer}>
            <Icon name="close" size={35} color={COLORS.text_blue} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '5%',
          }}>
          <Avatar />
          <View style={styles.headerTextCont}>
            <MyText
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                letterSpacing: -1,
              }}>
              Arham Saqib
            </MyText>
            <MyText style={{fontSize: 15, letterSpacing: -1}}>Lahore</MyText>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView>
        {/* <SafeAreaView> */}

        <View
          style={{
            marginTop: 60,
            marginLeft: '10%',
          }}>
          <DrawerItemList {...props} />
        </View>
        {/* </SafeAreaView> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // borderWidth: 1,
    //height: 100,
    //marginTop: '20%',
    justifyContent: 'center',
    // flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light_blue,
    minHeight: '20%',
  },
  headerTextCont: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
