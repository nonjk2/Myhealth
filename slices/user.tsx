import {} from '@react-native-seoul/kakao-login';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userType {
  AccessToken: string;
  email?: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {} as userType,
  reducers: {
    setUser(state, action: PayloadAction<userType>) {
      state.AccessToken = action.payload.AccessToken;
      state.email = action.payload.email;
    },
  },
  //   extraReducers: builder => {},
});

export default userSlice;
