import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ResponseUndongData} from '../types/Posts/posts';

interface Undongitems {
  undongs: ResponseUndongData;
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
