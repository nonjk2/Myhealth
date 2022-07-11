import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export interface items {
  complete: boolean;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialState = {
  complete: false,
  date: 'Sat Jul 08 2022 22:59:13 GMT+0900 (대한민국 표준시)',
  firstName: 'Kwon1',
  lastName: 'YoungJae1',
  email: 'kyoje11@gmail1.com',
} as items;

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    setExercise(state, action) {
      state.complete = action.payload.complete;
      state.date = action.payload.date;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
  },
  //   extraReducers: builder => {},
});

export default exerciseSlice;
