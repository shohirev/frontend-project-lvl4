import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from './routes.js';
import useAuth from './hooks/index.jsx';
import Header from './components/header.jsx';

const SignUpForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const history = useHistory();

  const schema = yup.object().shape({
    username: yup.string().min(3, t('signUpPage.validationErrors.username'))
                          .max(20, t('signUpPage.validationErrors.username'))
                          .required(t('signUpPage.validationErrors.requiredField')),
    password: yup.string().min(6, t('signUpPage.validationErrors.password'))
                          .required(t('signUpPage.validationErrors.requiredField')),
    confirmPassword: yup.string().oneOf([yup.ref('password')], t('signUpPage.validationErrors.confirmPassword'))
                                 .required(t('signUpPage.validationErrors.requiredField')),
    });

  const handler = async (values, actions) => {
    const {username, password} = values;
    try {
      const response = await axios.post(routes.signup(), { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      auth.logIn();
      history.push('/');
    } catch (err) {
      actions.setSubmitting(false);
      const { status } = err.response;
      if (status === 409) {
        actions.setErrors({username: t('userDuplication')});
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
        errors,
        isValid,
      }) => {
        return (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
          <Form.Floating className="mb-3">
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
            <label htmlFor="username">{t('signUpPage.placeholders.username')}</label>
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Floating>
          </Row>
          <Row className="mb-3">
            <Form.Floating className="mb-3">
              <Form.Control
                type="text"
                id="password"
                name="password"
                placeholder={t('signUpPage.placeholders.password')}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <label htmlFor="password">{t('signUpPage.placeholders.password')}</label>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Floating>
          </Row>
          <Row className="mb-3">
            <Form.Floating className="mb-3">
              <Form.Control 
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                placeholder={t('signUpPage.placeholders.confirmPassword')}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              <label htmlFor="confirmPassword">{t('signUpPage.placeholders.confirmPassword')}</label>
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Floating>
          </Row>
          <Button type="submit" variant="outline-primary">{t('signUpPage.signUpBtn')}</Button>
        </Form>
        );
      }}
    </Formik>
  );
};

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header />
      <Row>
        {t('signUpPage.title')}
      </Row>
      <Row>
        <SignUpForm />
      </Row>
    </Container>
  );
};

export default SignUpPage;
