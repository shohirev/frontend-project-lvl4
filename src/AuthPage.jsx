import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Container, Row, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from './routes.js';
import { useAuth } from './hooks/index.jsx';
import Header from './components/Header.jsx';

const AuthorizationForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const { username, password } = values;

        const response = await axios.post(routes.login(), {
          username,
          password,
        });
        const { token } = response.data;
        auth.logIn(token, username);
        history.push('/');
      } catch (error) {
        setAuthFailed(true);
      }
    },
  });

  const feedback = authFailed ? (
    <Form.Control.Feedback type="invalid" tooltip>
      {t('errors.authorization')}
    </Form.Control.Feedback>
  ) : null;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="username" srOnly>
          {t('authPage.placeholders.username')}
        </Form.Label>
        <Form.Control
          id="username"
          name="username"
          placeholder={t('authPage.placeholders.username')}
          onChange={formik.handleChange}
          isInvalid={authFailed}
          required
          value={formik.values.username}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password" srOnly>
          {t('authPage.placeholders.password')}
        </Form.Label>
        <Form.Control
          id="password"
          name="password"
          placeholder={t('authPage.placeholders.password')}
          isInvalid={authFailed}
          onChange={formik.handleChange}
          required
          value={formik.values.password}
        />
        {feedback}
      </Form.Group>
      <Button type="submit">{t('authPage.logInBtn')}</Button>
    </Form>
  );
};

const AuthPageFooter = () => {
  const { t } = useTranslation();

  return (
    <div>
      <span className="mr-2">{t('authPage.signUpGreeting')}</span>
      <Link to="/signup">{t('authPage.signUpLink')}</Link>
    </div>
  );
};

const AuthPage = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <Container className="d-flex flex-column justify-content-center align-items-center h-100 my-4 overflow-hidden rounded shadow">
      <Row>
        <AuthorizationForm />
      </Row>
      <Row>
        <AuthPageFooter />
      </Row>
    </Container>
  </div>
);

export default AuthPage;
