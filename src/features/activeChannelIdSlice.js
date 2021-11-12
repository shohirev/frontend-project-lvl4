import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const initialState = null;

const activeChannelIdSlice = createSlice({
  name: 'activeChannelId',
  initialState,
  reducers: {
    changingActiveChannelId: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => action.payload.currentChannelId);
  },
});

export const { changingActiveChannelId } = activeChannelIdSlice.actions;

export default activeChannelIdSlice.reducer;
