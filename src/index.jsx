// @ts-check
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import buildSocketAPI from './socketAPI.js';
import Chat from './Chat.jsx';

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

  const appContainer = document.querySelector('#chat');
  const App = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Chat socketAPI={buildSocketAPI(io())} />
      </ErrorBoundary>
    </RollbarProvider>
  );
  ReactDOM.render(App, appContainer);
}

const init = (socketClient) => (
  <Chat socketAPI={buildSocketAPI(socketClient)} />
);

export default init;
