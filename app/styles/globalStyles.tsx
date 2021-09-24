import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
  elevated_card: {
    padding: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
  },
});
