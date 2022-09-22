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
import 'react-native-gesture-handler'; // 제스쳐 핸들러 최상위 파일에 임포트
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide(); /** 추가 **/
      }, 2000); /** 스플래시 시간 조절 (2초) **/
    } catch (e) {
      console.warn('에러발생');
      console.warn(e);
    }
  });
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNav />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
