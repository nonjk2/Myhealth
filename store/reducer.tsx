import {combineReducers} from '@reduxjs/toolkit';
import examslice from '../slices/examslice';
import exerciseSlice from '../slices/exercise';
import onToggle from '../slices/snack';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  exercise: exerciseSlice.reducer,
  examslice: examslice.reducer,
  snack: onToggle.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
