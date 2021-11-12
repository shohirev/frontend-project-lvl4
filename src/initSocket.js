import store from './app/store.js';
import {
  addingNewChannel,
  renamingChannel,
  removingChannel,
} from './features/channelsSlice.js';
import { addingNewMessage } from './features/messagesSlice.js';
import { changingActiveChannelId } from './features/activeChannelIdSlice.js';

const initSocket = (socket) => {
  socket.on('newChannel', (newChannel) => {
    store.dispatch(addingNewChannel(newChannel));
    store.dispatch(changingActiveChannelId(newChannel.id));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(renamingChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removingChannel(id));
    store.dispatch(changingActiveChannelId(1));
  });

  socket.on('newMessage', (m) => {
    store.dispatch(addingNewMessage(m));
  });
};

export default initSocket;
