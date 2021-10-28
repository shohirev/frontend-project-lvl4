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

ReactDOM.render(<App socket={io()} />, appContainer);

export default (socketClient) => (<App socket={socketClient} />);
