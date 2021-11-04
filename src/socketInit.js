import { useDispatch } from 'react-redux';
import {
  addingNewChannel,
  renamingChannel,
  removingChannel,
} from './features/channelsSlice.js';
import { addingNewMessage } from './features/messagesSlice.js';
import { changingActiveChannelId } from './features/activeChannelIdSlice.js';

export default (socketInstance) => {
  const dispatch = useDispatch();

  socketInstance.on('newChannel', (newChannel) => {
    dispatch(addingNewChannel(newChannel));
    dispatch(changingActiveChannelId(newChannel.id));
  });

  socketInstance.on('renameChannel', (channel) => {
    dispatch(renamingChannel(channel));
  });

  socketInstance.on('removeChannel', ({ id }) => {
    dispatch(removingChannel(id));
    dispatch(changingActiveChannelId(1));
  });

  socketInstance.on('newMessage', (m) => {
    dispatch(addingNewMessage(m));
  });
};
