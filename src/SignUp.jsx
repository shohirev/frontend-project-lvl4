import React from 'react';
import {
  Container, Col, Row, Form, Button, Spinner,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from './routes.js';
import { useAuth } from './hooks/index.jsx';
import Header from './components/Header.jsx';

const SignUpForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const history = useHistory();

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('signUpPage.validationErrors.username'))
      .max(20, t('signUpPage.validationErrors.username'))
      .required(t('signUpPage.validationErrors.requiredField')),
    password: yup
      .string()
      .min(6, t('signUpPage.validationErrors.password'))
      .required(t('signUpPage.validationErrors.requiredField')),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password')],
        t('signUpPage.validationErrors.confirmPassword'),
      )
      .required(t('signUpPage.validationErrors.requiredField')),
  });

  const handler = async (values, actions) => {
    const { username, password } = values;
    try {
      const response = await axios.post(routes.signup(), {
        username,
        password,
      });
      const { token } = response.data;
      auth.logIn(token, username);
      history.push('/');
    } catch (error) {
      const { status } = error.response;
      actions.setSubmitting(false);
      if (status === 409) {
        actions.setErrors({ username: t('errors.userDuplication') });
      } else {
        toast(t('errors.unknown', { type: 'error' }));
      }
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        username: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={handler}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        isSubmitting,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="username" srOnly>
                {t('signUpPage.placeholders.username')}
              </Form.Label>
              <Form.Control
                type="text"
                id="username"
                name="username"
                placeholder={t('signUpPage.placeholders.username')}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.username && !errors.username}
                isInvalid={touched.username && errors.username}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="password" srOnly>
                {t('signUpPage.placeholders.password')}
              </Form.Label>
              <Form.Control
                type="password"
                id="password"
                name="password"
                placeholder={t('signUpPage.placeholders.password')}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="confirmPassword" srOnly>
                {t('signUpPage.placeholders.confirmPassword')}
              </Form.Label>
              <Form.Control
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t('signUpPage.placeholders.confirmPassword')}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type="submit" disabled={isSubmitting} variant="outline-primary" block>
            {isSubmitting ? <Spinner animation="border" variant="primary" /> : t('signUpPage.signUpBtn')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Container className="d-flex flex-column justify-content-center align-items-center h-100 my-4 overflow-hidden rounded shadow">
        <Row>
          <h1>
            {t('signUpPage.title')}
          </h1>
        </Row>
        <Row>
          <SignUpForm />
        </Row>
      </Container>
    </div>
  );
};

export default SignUpPage;
