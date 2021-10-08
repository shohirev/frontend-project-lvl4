import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/channelsSlice.js';
import messagesReducer from '../features/messagesSlice.js';
import activeChannelIdReducer from '../features/activeChannelIdSlice.js';

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    activeChannelId: activeChannelIdReducer,
  },
});
