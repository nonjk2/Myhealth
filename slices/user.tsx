import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
    },
  },
  //   extraReducers: builder => {},
});

export default userSlice;
