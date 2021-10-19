import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import App from './App.jsx';

const init = (socketClient = io()) => {
  const appContainer = document.querySelector('#chat');

  if (appContainer) {
    ReactDOM.render(<App socket={socketClient} />, appContainer);
  }
  return <App socket={socketClient} />;
};

export default init;
