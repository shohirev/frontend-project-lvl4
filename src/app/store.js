import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../features/channelsSlice.js';
import messagesReducer from '../features/messagesSlice.js';
import activeChannelIdReducer from '../features/activeChannelIdSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    activeChannelId: activeChannelIdReducer,
  },
});
