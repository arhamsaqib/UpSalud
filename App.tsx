import React from 'react';
import {LogBox} from 'react-native';
import {UpSalud} from './UpSalud';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {allReducers} from './app/redux/reducers';
import VideoCall from './call';

const App = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  const persistedReducer = persistReducer(persistConfig, allReducers);
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <UpSalud />
      </PersistGate>
    </Provider>
  );
};

export default App;
