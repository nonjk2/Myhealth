import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ResponseImgArrayData,
  ResponseUndongArrayData,
} from '../types/Posts/posts';

interface Undongitems {
  undongs: {
    undongs: ResponseUndongArrayData[];
    undongimg: ResponseImgArrayData[];
  };
}

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {} as Undongitems,
  reducers: {
    setUndongs(state, action: PayloadAction<Undongitems>) {
      state.undongs = action.payload.undongs;
    },
  },
});

export default exerciseSlice;
