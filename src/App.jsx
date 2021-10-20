import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './i18n.js';
import { Provider } from 'react-redux';
import store from './app/store.js';
import Main from './Main.jsx';
import AuthPage from './AuthPage.jsx';
import SignUp from './SignUp.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { authContext, socketContext } from './contexts/index.jsx';
import { useAuth, useSocket } from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const isAuthorized = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(isAuthorized);
  const socket = useSocket();

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    socket.removeAllListeners();
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
    <Route render={() => (auth.loggedIn ? children : <Redirect to="/login" />)} />
  );
};

const Chat = ({ socket }) => (
  <Suspense fallback="loading">
    <Provider store={store}>
      <socketContext.Provider value={socket}>
        <AuthProvider>
          <Router>
            <Switch>
              <LoggedInRoute exact path="/">
                <Main />
              </LoggedInRoute>
              <Route exact path="/login">
                <AuthPage />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </Router>
        </AuthProvider>
      </socketContext.Provider>
    </Provider>
  </Suspense>
);

export default Chat;
