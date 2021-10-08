import { createSlice } from '@reduxjs/toolkit';
import { changingActiveChannelId } from './activeChannelIdSlice.js';

const initialState = [];

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
  	loadingChannels: (state, action) => {
      const loadedChannels = action.payload;
      loadedChannels.forEach((channel) => {
        if (!state.find((c) => c.id === channel.id)) {
          state.push(channel);
        }
      });
    },
    addingNewChannel: (state, action) => {
      const newChannel = action.payload;
      if (!state.find((channel) => channel.id === newChannel.id)) {
        state.push(newChannel);
      }
    },
    renamingChannel: (state, action) => {
      const newName = action.payload.name;
      const channel =  state.find((c) => c.id === action.payload.id);
      channel.name = newName;
    },
  	removingChannel: (state, action) => {
      const id = action.payload;
      return state.filter((channel) => channel.id !== id);
    },
  },
});

export const { loadingChannels, addingNewChannel, renamingChannel, removingChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
