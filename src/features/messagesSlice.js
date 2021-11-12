/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const initialState = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addingNewMessage: (state, action) => {
      const newMessage = action.payload;
      state.push(newMessage);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => action.payload.messages);
  },
});

export const { addingNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
