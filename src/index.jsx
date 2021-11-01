// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import App from './App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  const rollbarConfig = {
    accessToken: process.env.POST_CLIENT_ITEM_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  const app = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App socket={io()} />
      </ErrorBoundary>
    </RollbarProvider>
  );

  const appContainer = document.querySelector('#chat');
  ReactDOM.render(app, appContainer);
}

const init = (socketClient) => (<App socket={socketClient} />);

export default init;
