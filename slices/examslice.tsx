import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser: any = createAsyncThunk('users/fetchUser', async () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/comments?postId=1')
    .then(res => res.data)
    .catch(error => error);
});

interface extra {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const initialState = {
  postId: 1,
  id: 3,
  name: 'dkdk',
  email: 'kyoje11@gmail1.com',
  body: 'asd',
} as extra;

const examslice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUser.pending]: state => {
      state.postId = 0;
      state.id = 0;
      state.name = '';
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.postId = action.payload;
      state.id = action.payload;
      state.name = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.postId = action.payload;
      state.id = action.payload;
      state.name = action.payload;
    },
  },
});

export default examslice;
