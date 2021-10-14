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
import { authContext, socketContext } from './contexts/index.jsx';
import { useAuth } from './hooks/index.jsx';

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

const Chat = ({socket}) => {
  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <AuthProvider>
          <socketContext.Provider value={socket}>
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
          </socketContext.Provider>
        </AuthProvider>
      </Provider>
    </Suspense>
  );
};

export default Chat;
