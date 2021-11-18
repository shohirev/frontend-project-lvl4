import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getMessagesByChannel } from '../../features/selectors.js';

const MessageBox = () => {
  const messagesList = useSelector(getMessagesByChannel)
    .map((message) => (
      <div key={message.id}>
        <b>{message.username}</b>
        {': '}
        {message.text}
      </div>
    ));

  const fakeEntry = useRef(null);

  useEffect(() => {
    fakeEntry.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="overflow-auto h-100 px-5">
      {messagesList}
      <span ref={fakeEntry} />
    </div>
  );
};

export default MessageBox;
