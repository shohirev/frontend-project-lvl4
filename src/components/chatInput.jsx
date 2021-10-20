import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
import { useSocket } from '../hooks/index.jsx';

const ChatInput = () => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');
  const currentChannel = useSelector((state) => state.activeChannelId);
  const socket = useSocket();

  const sendMessage = () => {
    socket.emit(
      'newMessage',
      { username: localStorage.getItem('username'), text: messageText, channelId: currentChannel },
      () => {},
    );
    setMessageText('');
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder={t('chatInput.placeholder')}
        data-testid="new-message"
        aria-describedby="newMessageBtn"
      />
      <Button
        role="button"
        name={t('chatInput.sendMessageBtn')}
        variant="outline-secondary"
        onClick={sendMessage}
      >
        Отправить
      </Button>
    </InputGroup>
  );
};

export default ChatInput;
