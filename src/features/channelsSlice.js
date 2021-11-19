/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const initialState = {
  activeId: null,
  channelsData: [],
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addingNewChannel: ({ channelsData }, action) => {
      const newChannel = action.payload;
      channelsData.push(newChannel);
    },
    renamingChannel: ({ channelsData }, action) => {
      const newName = action.payload.name;
      const channel = channelsData.find((c) => c.id === action.payload.id);
      channel.name = newName;
    },
    removingChannel: (state, action) => {
      const id = action.payload;
      state.channelsData = state.channelsData.filter((channel) => channel.id !== id);
    },
    changingActiveChannelId: (state, action) => {
      state.activeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const loadedChannels = action.payload.channels;
      state.channelsData = loadedChannels;
      state.activeId = action.payload.currentChannelId;
    });
  },
});

export const {
  addingNewChannel,
  renamingChannel,
  removingChannel,
  changingActiveChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
