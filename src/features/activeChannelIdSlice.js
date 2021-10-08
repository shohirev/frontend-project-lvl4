import { createSlice } from '@reduxjs/toolkit';
import { removingChannel } from './channelsSlice.js';

const initialState = null;

export const activeChannelIdSlice = createSlice({
  name: 'activeChannelId',
  initialState,
  reducers: {
    changingActiveChannelId: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { changingActiveChannelId } = activeChannelIdSlice.actions;

export default activeChannelIdSlice.reducer;
