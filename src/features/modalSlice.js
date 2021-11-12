import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  modalProps: {},
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeModalType: (state, action) => action.payload,
  },
});

export const { changeModalType } = modalSlice.actions;

export default modalSlice.reducer;
