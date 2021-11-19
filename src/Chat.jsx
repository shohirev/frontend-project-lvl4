import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n.js';
import { ToastContainer } from 'react-toastify';
import store from './app/store.js';
import Main from './Main.jsx';
import AuthPage from './AuthPage.jsx';
import SignUp from './SignUp.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { authContext, socketContext } from './contexts/index.jsx';
import { useAuth } from './hooks/index.jsx';

const SocketAPIProvider = ({ children, socketAPI }) => (
  <socketContext.Provider value={socketAPI}>
    {children}
  </socketContext.Provider>
);

const AuthProvider = ({ children }) => {
  const initAuthData = () => JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(initAuthData);

  const logIn = (token, username) => {
    localStorage.setItem('user', JSON.stringify({ username, token }));
    setUser({ username, token });
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const getUser = () => user;

  return (
    <authContext.Provider
      value={{
        getUser, logIn, logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const LoggedInRoute = ({ children }) => {
  const auth = useAuth();
  const isLoggedIn = auth.getUser();

  return (
    <Route
      render={() => (isLoggedIn ? children : <Redirect to="/login" />)}
    />
  );
};

const Chat = ({ socketAPI }) => (
  <Suspense fallback="loading">
    <Provider store={store}>
      <SocketAPIProvider socketAPI={socketAPI}>
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
          <ToastContainer
            position="top-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
        </AuthProvider>
      </SocketAPIProvider>
    </Provider>
  </Suspense>
);

export default Chat;
