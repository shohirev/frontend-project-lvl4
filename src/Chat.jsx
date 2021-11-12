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

const SocketProvider = ({ children, socket }) => (
  <socketContext.Provider value={socket}>
    {children}
  </socketContext.Provider>
);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

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

  return (
    <Route
      render={() => (auth.getUser() ? children : <Redirect to="/login" />)}
    />
  );
};

const Chat = ({ socket }) => (
  <Suspense fallback="loading">
    <Provider store={store}>
      <SocketProvider socket={socket}>
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
      </SocketProvider>
    </Provider>
  </Suspense>
);

export default Chat;
