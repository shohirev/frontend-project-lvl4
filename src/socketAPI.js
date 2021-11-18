import store from './app/store.js';
import {
  addingNewChannel,
  renamingChannel,
  removingChannel,
  changingActiveChannelId,
} from './features/channelsSlice.js';
import { addingNewMessage } from './features/messagesSlice.js';

const initSocket = (socketClient) => {
  socketClient.on('newChannel', (newChannel) => {
    store.dispatch(addingNewChannel(newChannel));
    store.dispatch(changingActiveChannelId(newChannel.id));
  });

  socketClient.on('renameChannel', (channel) => {
    store.dispatch(renamingChannel(channel));
  });

  socketClient.on('removeChannel', ({ id }) => {
    store.dispatch(removingChannel(id));
    store.dispatch(changingActiveChannelId(1));
  });

  socketClient.on('newMessage', (m) => {
    store.dispatch(addingNewMessage(m));
  });
};

const buildSocketAPI = (socket) => {
  initSocket(socket);

  const socketClientAPI = {
    sendChannel: (data) => {
      socket.emit('newChannel', data, () => {});
    },
    sendNewChannelName: (data) => {
      socket.emit('renameChannel', data, () => {});
    },
    removeChannel: (data) => {
      socket.emit('removeChannel', data, () => {});
    },
    sendMessage: (data) => {
      socket.emit('newMessage', data, () => {});
    },
  };

  return socketClientAPI;
};

export default buildSocketAPI;
