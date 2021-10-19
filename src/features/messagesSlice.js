import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addingMessages: (state, action) => {
      const loadedMessages = action.payload;
      loadedMessages.forEach((message) => {
        state.push(message);
      });
      return state;
    },
    addingNewMessage: (state, action) => {
      const newMessage = action.payload;
      state.push(newMessage);
      return state;
    },
  },
});

export const { addingMessages, addingNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
