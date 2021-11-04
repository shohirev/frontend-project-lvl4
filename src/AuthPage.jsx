import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Container, Col, Row, Form, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from './routes.js';
import { useAuth } from './hooks/index.jsx';
import Header from './components/Header.jsx';

const AuthorizationForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
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
        const { status } = error.response;
        if (status === 401) {
          actions.setErrors({ authorization: t('errors.authorization') });
        } else {
          toast(t('errors.unknown', { type: 'error' }));
        }
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label htmlFor="username" srOnly>
            {t('authPage.placeholders.username')}
          </Form.Label>
          <Form.Control
            id="username"
            name="username"
            placeholder={t('authPage.placeholders.username')}
            onChange={formik.handleChange}
            isInvalid={formik.errors.authorization}
            required
            value={formik.values.username}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label htmlFor="password" srOnly>
            {t('authPage.placeholders.password')}
          </Form.Label>
          <Form.Control
            id="password"
            name="password"
            type="password"
            placeholder={t('authPage.placeholders.password')}
            isInvalid={formik.errors.authorization}
            onChange={formik.handleChange}
            required
            value={formik.values.password}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {t('errors.authorization')}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row className="mb-3">
        <Form.Group as={Col}>
          <Button type="submit" variant="outline-primary" block>{t('authPage.logInBtn')}</Button>
        </Form.Group>
      </Form.Row>
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
