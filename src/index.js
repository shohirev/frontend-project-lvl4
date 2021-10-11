// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { ReactDOM } from 'react';
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

const init = async () => {
  const appContainer = document.querySelector('#chat');
  await ReactDOM.render(
    <App />,
    appContainer
  );
};

export default init();

init();
