import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const MessageBox = () => {
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const messages = useSelector((state) => state.messages);

  const messagesList = messages
    .filter((message) => message.channelId === activeChannelId)
    .map((message) => (
      <Row key={message.id}>
        <b>{message.username}</b>
        {': '}
        {message.text}
      </Row>
    ));

  return <Container className="overflow-auto px-5">{messagesList}</Container>;
};

export default MessageBox;
