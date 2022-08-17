import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SnackbarState {
  toggle: boolean;
  snackPosition: string;
}
const onToggle = createSlice({
  name: 'useSnackbar',
  initialState: {} as SnackbarState,
  reducers: {
    exerciseCreate: {
      reducer: (state, action: PayloadAction<SnackbarState>) => {
        state.toggle = action.payload.toggle;
        state.snackPosition = action.payload.snackPosition;
      },
      prepare: (toggle, snackPosition) => {
        return {payload: {toggle, snackPosition}};
      },
    },
  },
});

export default onToggle;
