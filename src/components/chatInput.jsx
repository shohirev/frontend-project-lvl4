import React, { useState } from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

const ChatInput = ({ socket }) => {
  const { t } = useTranslation();
  const [messageText, setMessageText] = useState('');
  const currentChannel = useSelector((state) => state.activeChannelId);

  const sendMessage = () => {
    setMessageText('');
    socket.emit('newMessage', {text: messageText, channelId: currentChannel});
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
        name={t('chatInput.sendMessageBtn')}
        variant="outline-secondary"
        onClick={sendMessage}
      >
        <ArrowRightSquare/>
      </Button>
    </InputGroup>
  );
};

export default ChatInput;
