import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

export default () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const history = useHistory();

  const LogOutBtn = () => {
    const handler = () => {
      auth.logOut();
      history.push('/');
    };

    return (
      <Button
        variant="primary"
        onClick={handler}
      >
        {t('header.logOutBtn')}
      </Button>
    );
  };

  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand as="header">
          <Link to='/'>{t('header.title')}</Link>
          <LogOutBtn />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
