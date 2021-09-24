import React from 'react';
import {LogBox} from 'react-native';
import {UpSalud} from './UpSalud';

const App = () => {
  LogBox.ignoreAllLogs();
  return <UpSalud />;
};

export default App;
