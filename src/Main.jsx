import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { loadingChannels, addingNewChannel, renamingChannel, removingChannel } from './features/channelsSlice';
import { addingMessages, addingNewMessage } from './features/messagesSlice.js';
import { changingActiveChannelId } from './features/activeChannelIdSlice.js';
import axios from 'axios';
//import socket from './socket/index.js';
import routes from './routes.js';
import Header from './components/header.jsx';
import ChatInput from './components/chatInput.jsx';
import ChannelsPanel from './components/channelsPanel.jsx';
import { useSocket } from './hooks/index.jsx';

const Main = () => {
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const activeChannelId = useSelector((state) => state.activeChannelId);

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const response = await axios.get(routes.data(), {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });

      dispatch(loadingChannels(response.data.channels));
      dispatch(addingMessages(response.data.messages));
      const generalChannel = response.data.channels.find((c) => c.name === 'general');
      dispatch(changingActiveChannelId(generalChannel.id));
    } catch (err) {
      console.log('error', err)
    }
  }, []);

  const socket = useSocket();
  
  socket.on('newChannel', (newChannel) => {
    dispatch(addingNewChannel(newChannel));
    dispatch(changingActiveChannelId(newChannel.id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renamingChannel(channel));
  });

  socket.on('removeChannel', ({id}) => {
    dispatch(removingChannel(id));
    dispatch(changingActiveChannelId(1));
  });

  socket.on('newMessage', (m) => {
    dispatch(addingNewMessage(m));
  });

  const messagesList = messages.filter((message) => message.channelId === activeChannelId)
    .map((message) => <li key={message.id}>{message.text}</li>);

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col>
            <ChannelsPanel />
          </Col>
          <Col>
            {messagesList}
            <ChatInput socket={socket} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
