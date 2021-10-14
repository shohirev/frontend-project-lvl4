import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
  	addingMessages: (state, action) => {
      const loadedMessages = action.payload;
      loadedMessages.forEach((message) => {
        if(!state.find((m) => m.id === message.id)) {
          state.push(message);
        }
      });
      return state;
    },
    addingNewMessage: (state, action) => {
      const newMessage = action.payload;
      /*if(!state.find((m) => m.id === newMessage.id)) {
        state.push(newMessage);
      }*/
      state.push(newMessage);
      return state;
    }
  },
});

export const { addingMessages, addingNewMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
