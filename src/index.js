// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: "66038ab5112a4fb29bd26c74560fba52",
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
      environment: "production"
  }
};

export const init = (socketClient) => {
  const appContainer = document.querySelector('#chat');

  if (appContainer) {
    ReactDOM.render(
      <App socket={socketClient}/>,
      appContainer
    );
    return;
  }
  return <App socket={socketClient}/>;
};

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  let socket = io();
  init(socket);
}
