import {KakaoOAuthToken, KakaoProfile} from '@react-native-seoul/kakao-login';
import {createSlice} from '@reduxjs/toolkit';

interface userType {
  user: KakaoProfile;
  auth: KakaoOAuthToken;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {} as userType,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.auth = action.payload.auth;
    },
  },
  //   extraReducers: builder => {},
});

export default userSlice;
