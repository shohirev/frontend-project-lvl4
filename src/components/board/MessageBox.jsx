import React from 'react';
import { useSelector } from 'react-redux';
import ScrollToBottom from 'react-scroll-to-bottom';

const MessageBox = () => {
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const messages = useSelector((state) => state.messages);

  const messagesList = messages
    .filter((message) => message.channelId === activeChannelId)
    .map((message) => (
      <div key={message.id}>
        <b>{message.username}</b>
        {': '}
        {message.text}
      </div>
    ));

  return (
    <ScrollToBottom className="overflow-auto h-100 px-5">
      {messagesList}
    </ScrollToBottom>
  );
};

export default MessageBox;
