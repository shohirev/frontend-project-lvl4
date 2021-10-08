// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import './i18n.js';
import { store } from './app/store.js';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import Main from './Main.jsx';
import AuthPage from './AuthPage.jsx';
import SignUp from './SignUp.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import authContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

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

const AuthProvider = ({ children }) => {
  const isAuthorized = localStorage.getItem('token');
  const [ loggedIn, setLoggedIn ] = useState(isAuthorized);
  const logIn = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const LoggedInRoute = ({ children }) => {
  const auth = useAuth();

  return (
    <Route
      render={() => 
        auth.loggedIn ? (
          children
        ) :
        (
          <Redirect to='/login' />
        )
      }
    >
    </Route>
  );
};

const Chat = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <LoggedInRoute exact path='/'>
            <Main />
          </LoggedInRoute>
          <Route exact path='/login'>
            <AuthPage />
          </Route>
          <Route exact path='/signup'>
            <SignUp />
          </Route>
          <Route path='*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

const appContainer = document.querySelector('#chat');
ReactDOM.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <Chat />
    </Provider>
  </Suspense>,
  appContainer
);
