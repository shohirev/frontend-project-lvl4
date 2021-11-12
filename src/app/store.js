import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loadingSlice.js';
import channelsReducer from '../features/channelsSlice.js';
import messagesReducer from '../features/messagesSlice.js';
import activeChannelIdReducer from '../features/activeChannelIdSlice.js';
import modalReducer from '../features/modalSlice.js';

export default configureStore({
  reducer: {
    loading: loadingReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    activeChannelId: activeChannelIdReducer,
    modal: modalReducer,
  },
});
