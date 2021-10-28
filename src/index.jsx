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

const appContainer = document.querySelector('#chat');

if (appContainer) {
  ReactDOM.render(<App socket={io()} />, appContainer);
}

const init = (socketClient) => (<App socket={socketClient} />);

export default init;
