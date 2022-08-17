/**
 * @format
 */
import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppNav} from './routes';
import store from './store';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNav />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
