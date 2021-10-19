// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if (
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production'
) {
  init();
}

export default init();
