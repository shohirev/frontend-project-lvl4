import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputGroup, Button, FormControl } from 'react-bootstrap';
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
    socket.emit(
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
    <InputGroup className="mb-3 mt-auto px-5 py-3">
      <FormControl
        value={messageText}
        onChange={handleChange}
        placeholder={t('chatInput.placeholder')}
        data-testid="new-message"
        aria-describedby="newMessageBtn"
      />
      <InputGroup.Append>
        <Button
          role="button"
          name={t('chatInput.sendMessageBtn')}
          variant="outline-secondary"
          disabled={isDisabled}
          onClick={sendMessage}
        >
          Отправить
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default ChatInput;
