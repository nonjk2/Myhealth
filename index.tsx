/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import {AppNav} from './routes';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNav />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
