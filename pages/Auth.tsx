import {
  getProfile,
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AuthProps} from '../routes';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';

const Authpage: React.FC<AuthProps> = ({}: AuthProps) => {
  const dispatch = useAppDispatch();
  const [result, setResult] = useState('');

  const signInWithKakao = async (): Promise<void> => {
    await login()
      .then(res =>
        dispatch(userSlice.actions.setUser({auth: res, user: {} as any}))
      )
      .catch(err => console.log(err));
  };

  // const signOutWithKakao = async (): Promise<void> => {
  //   const message = await logout();

  //   setResult(message);
  // };

  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile | KakaoProfileNoneAgreement =
      await getProfile();
    console.log(profile);
  };

  // const unlinkKakao = async (): Promise<void> => {
  //   const message = await unlink();

  //   setResult(message);
  // };

  // const LoginmyApp = () => {
  //   signInWithKakao.then(()=>)
  // }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>{result}</Text>

      <View>
        <Button title="LOGIN" onPress={signInWithKakao} />
        <Button
          title="getProfile"
          onPress={
            // () =>
            // dispatch(
            //   userSlice.actions.setUser({
            //     user: true,
            //   })
            // )
            getKakaoProfile
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
