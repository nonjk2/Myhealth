import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
} from '@react-native-seoul/kakao-login';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userType {
  auth?: KakaoOAuthToken;
  user?: KakaoProfile | KakaoProfileNoneAgreement;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {} as userType,
  reducers: {
    setUser(state, action: PayloadAction<userType>) {
      state.auth = action.payload.auth;
      state.user = action.payload.user;
    },
  },
  //   extraReducers: builder => {},
});

export default userSlice;
