import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  addingChannels,
  addingNewChannel,
  renamingChannel,
  removingChannel,
} from './features/channelsSlice';
import { addingMessages, addingNewMessage } from './features/messagesSlice.js';
import { changingActiveChannelId } from './features/activeChannelIdSlice.js';
import routes from './routes.js';
import Header from './components/Header.jsx';
import Chat from './components/chat/Chat.jsx';
import ChannelsPanel from './components/ChannelsPanel.jsx';
import { useSocket } from './hooks/index.jsx';

const Main = () => {
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(routes.data(), {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        dispatch(addingChannels(response.data.channels));
        dispatch(addingMessages(response.data.messages));
        const generalChannel = response.data.channels.find(
          (c) => c.name.toLowerCase() === 'general',
        );
        dispatch(changingActiveChannelId(generalChannel.id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchInitialData();

    socket.on('newChannel', (newChannel) => {
      dispatch(addingNewChannel(newChannel));
      dispatch(changingActiveChannelId(newChannel.id));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(renamingChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removingChannel(id));
      dispatch(changingActiveChannelId(1));
    });

    socket.on('newMessage', (m) => {
      dispatch(addingNewMessage(m));
    });
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <ChannelsPanel />
          </Col>
          <Col className="d-flex flex-column p-0 w-100 h-100">
            <Chat />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
