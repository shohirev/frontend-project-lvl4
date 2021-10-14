import React from 'react';
import { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import routes from './routes.js';
import { useAuth } from './hooks/index.jsx';
import Header from './components/header.jsx';

const AuthorizationForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [ authFailed, setAuthFailed ] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async values => {
      setAuthFailed(false);

      try {
        const { username, password } = values;

        const response = await axios.post(routes.login(), {
          username,
          password,
        });
        const { token } = response.data;
        auth.logIn(token);
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
        <Form.Floating className="mb-3">
          <Form.Control
            id="username"
            name="username"
            placeholder={t('authPage.placeholders.username')}
            onChange={formik.handleChange}
            isInvalid={authFailed}
            required
            value={formik.values.username}
          />
          <label htmlFor="username">{t('authPage.placeholders.username')}</label>
        </Form.Floating>
      </Form.Group>
      <Form.Group>
        <Form.Floating className="mb-3">
          <Form.Control
            id="password"
            name="password"
            placeholder={t('authPage.placeholders.password')}
            isInvalid={authFailed}
            onChange={formik.handleChange}
            required
            value={formik.values.password}
          />
          <label htmlFor="password">{t('authPage.placeholders.password')}</label>
          {feedback}
        </Form.Floating>
      </Form.Group>
      <Button type="submit">{t("authPage.logInBtn")}</Button>
    </Form>
  );
};

const AuthPageFooter = () => {
  const { t } = useTranslation();

  return (
    <div>
      {t('authPage.signUpGreeting')}
      <Link to="/signup">{t('authPage.signUpLink')}</Link>
    </div>
  );
};

const AuthPage = () => {
  return (
    <div>
      <Header />
      <AuthorizationForm />
      <AuthPageFooter />
    </div>
  );
};

export default AuthPage;
