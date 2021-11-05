import React, { Suspense, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import './i18n.js';
import { ToastContainer } from 'react-toastify';
import store from './app/store.js';
import {
  addingNewChannel,
  renamingChannel,
  removingChannel,
} from './features/channelsSlice.js';
import { addingNewMessage } from './features/messagesSlice.js';
import { changingActiveChannelId } from './features/activeChannelIdSlice.js';
import Main from './Main.jsx';
import AuthPage from './AuthPage.jsx';
import SignUp from './SignUp.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import { authContext, socketContext } from './contexts/index.jsx';
import { useAuth, useSocket } from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const isAuthorized = localStorage.getItem('token');
  const [loggedIn, setLoggedIn] = useState(isAuthorized);

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
  const getToken = () => localStorage.getItem('token');

  return (
    <authContext.Provider
      value={{
        loggedIn, logIn, logOut, getToken,
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
      render={() => (auth.loggedIn ? children : <Redirect to="/login" />)}
    />
  );
};

const SocketProvider = ({ children, socket }) => {
  const dispatch = useDispatch();

  const runListeners = () => {
    socket.on('newChannel', (newChannel) => {
      dispatch(addingNewChannel(newChannel));
      dispatch(changingActiveChannelId(newChannel.id));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(renamingChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(removingChannel(id));
      dispatch(changingActiveChannelId(1));
    });

    socket.on('newMessage', (m) => {
      dispatch(addingNewMessage(m));
    });
  };

  return (
    <socketContext.Provider value={{ client: socket, runListeners }}>
      {children}
    </socketContext.Provider>
  );
};

const Chat = () => {
  const socket = useSocket();

  useEffect(() => {
    socket.runListeners();
  });

  return (
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
  );
};

const App = ({ socket }) => (
  <Suspense fallback="loading">
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <AuthProvider>
          <Chat />
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

export default App;
