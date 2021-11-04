import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSocket } from '../../hooks/index.jsx';

const ChatInput = () => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const currentChannel = useSelector((state) => state.activeChannelId);
  const socket = useSocket();

  const handleChange = (event) => {
    setMessageText(event.target.value);
    setIsDisabled(false);
  };

  const sendMessage = () => {
    socket.client.emit(
      'newMessage',
      {
        username: localStorage.getItem('username'),
        text: messageText,
        channelId: currentChannel,
      },
      () => {},
    );
    setMessageText('');
    setIsDisabled(true);
  };

  return (
    <Form
      inline
      className="justify-content-center px-5 py-3"
    >
      <Form.Label htmlFor="new-message" srOnly />
      <Form.Control
        id="new-message"
        className="w-75"
        value={messageText}
        onChange={handleChange}
        placeholder={t('chatInput.placeholder')}
        data-testid="new-message"
        aria-describedby="newMessageBtn"
      />
      <Button
        aria-label={t('chatInput.sendMessageBtn')}
        variant="outline-secondary"
        type="submit"
        disabled={isDisabled}
        onClick={sendMessage}
      >
        <ArrowRightSquare />
      </Button>
    </Form>
  );
};

export default ChatInput;
