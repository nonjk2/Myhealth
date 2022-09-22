/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import axios, {AxiosError} from 'axios';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {AuthProps} from '../routes';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import EncryptedStorage from 'react-native-encrypted-storage';

const Authpage: React.FC<AuthProps> = ({}: AuthProps) => {
  const dispatch = useAppDispatch();

  /** 카카로 로그인임 {토큰받아옴}*/
  useEffect(() => {
    const getTokenAndAutoLogin = async () => {
      try {
        const token = await EncryptedStorage.getItem('AccessToken');

        if (!token) {
          return;
        }
        const response = await axios.get(`${Config.API_URI}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        /** 원래는 RefreshToken 검증후 AccessToken을 새로 발급받아야함 */
        dispatch(
          userSlice.actions.setUser({
            AccessToken: token,
            email: response.data.data.email,
          })
        );
      } catch (error) {
        console.log(error);
        /** 토큰 만료시간 서버에서 확인후 res에서 올 코드 */
        // if ((error as AxiosError).response?.data.code === 'expried') {
        //   console.log('토큰만료');
        // }
      }
    };
    getTokenAndAutoLogin();
  }, [dispatch]);
  const signInWithKakao = async (): Promise<void> => {
    await login()
      .then(getKakaoProfile)
      .catch(err => console.log('카카오로그인에러', err));
  };

  /**
   카카오 프로필 가져오기
   */
  const getKakaoProfile = async (): Promise<void> => {
    await getProfile()
      .then(async (res: any) => {
        try {
          const Response = await axios.post(
            `${Config.API_URI}/users`,
            {
              email: res.email,
              profileURL: res.profileImageUrl,
            },
            {withCredentials: true}
          );
          dispatch(
            userSlice.actions.setUser({
              AccessToken: Response.data.data.Accesstoken,
              email: res.email,
            })
          );
          EncryptedStorage.setItem(
            'AccessToken',
            Response.data.data.Accesstoken
          );
        } catch (error) {
          const errorResponse: any = (error as AxiosError).response;
          if (errorResponse) {
            Alert.alert('알림', JSON.stringify(errorResponse.data?.message));
          }
        }
      })
      .catch(err => console.log('카카오 프로필 가져오기 실패', err))
      .finally(() => console.log('끝'));
  };
  /** 카카오로그아웃이요 */
  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();
    console.log(message);
  };
  /** 카카오로그아웃 언링크요 */
  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();
    console.log(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('../src/image/paldduck.png')} />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={signInWithKakao}>
          <Image
            source={require('../src/image/kakao_login_medium_narrow.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default Authpage;
