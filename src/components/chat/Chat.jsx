import React from 'react';
import ChatHeader from './ChatHeader.jsx';
import MessageBox from './MessageBox.jsx';
import ChatInput from './ChatInput.jsx';

const Chat = () => (
  <div className="h-100 w-100 d-flex flex-column justify-content-between">
    <ChatHeader />
    <MessageBox />
    <ChatInput />
  </div>
);

export default Chat;
