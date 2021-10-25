import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './i18n.js';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
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
    <Route
      render={() => (auth.loggedIn ? children : <Redirect to="/login" />)}
    />
  );
};

const rollbarConfig = {
  accessToken: '66038ab5112a4fb29bd26c74560fba52',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'production',
  },
};

const Chat = ({ socket }) => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
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
    </ErrorBoundary>
  </RollbarProvider>
);

export default Chat;
