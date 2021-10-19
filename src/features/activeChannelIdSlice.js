import { createSlice } from '@reduxjs/toolkit';
// import { removingChannel } from "./channelsSlice.js";

const initialState = null;

export const activeChannelIdSlice = createSlice({
  name: 'activeChannelId',
  initialState,
  reducers: {
    changingActiveChannelId: (state, action) => action.payload,
  },
});

export const { changingActiveChannelId } = activeChannelIdSlice.actions;

export default activeChannelIdSlice.reducer;
