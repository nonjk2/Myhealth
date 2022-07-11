import {combineReducers} from '@reduxjs/toolkit';
import examslice from '../slices/examslice';
import exerciseSlice from '../slices/exercise';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  exercise: exerciseSlice.reducer,
  examslice: examslice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
