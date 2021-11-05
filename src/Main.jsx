import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { addingChannels } from './features/channelsSlice.js';
import { addingMessages } from './features/messagesSlice.js';
import { changingActiveChannelId } from './features/activeChannelIdSlice.js';
import routes from './routes.js';
import Header from './components/Header.jsx';
import Chat from './components/chat/Chat.jsx';
import ChannelsPanel from './components/ChannelsPanel.jsx';
import { useAuth } from './hooks/index.jsx';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useAuth();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(routes.data(), {
          headers: { Authorization: `Bearer ${auth.getToken()}` },
        });

        dispatch(addingChannels(response.data.channels));
        dispatch(addingMessages(response.data.messages));
        const generalChannel = response.data.channels.find(
          (c) => c.name.toLowerCase() === 'general',
        );
        dispatch(changingActiveChannelId(generalChannel.id));
      } catch (error) {
        toast(t('errors.unknown', { type: 'error' }));
      }
    };
    fetchInitialData();
  }, [t, dispatch, auth]);

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
