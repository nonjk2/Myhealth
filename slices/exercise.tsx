import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UndongItemType} from '../types/undong';

export interface Undongitems {
  complete: boolean;
  id: number;
  undongDetail: UndongItemType;
  user?: [];
}

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: [] as Undongitems[],
  reducers: {
    addUndong: {
      reducer: (state, action: PayloadAction<Undongitems>) => {
        if (!state.map(v => v.id).includes(action.payload.id)) {
          state.push(action.payload);
        } else {
          console.log('asdf');
        }
      },
      prepare: (complete, id, undongDetail: UndongItemType) => {
        return {payload: {complete, id, undongDetail}};
      },
    },
  },
});

export default exerciseSlice;
