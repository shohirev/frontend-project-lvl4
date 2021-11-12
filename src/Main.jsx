import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';
import fetchData from './features/fetchData.js';
import Header from './components/Header.jsx';
import Board from './components/board/Board.jsx';
import ChannelsPanel from './components/ChannelsPanel.jsx';
import ModalRoot from './components/modals/ModalRoot.jsx';
import { useAuth } from './hooks/index.jsx';

const Main = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();

  useEffect(async () => {
    try {
      const { token } = auth.getUser();
      await dispatch(fetchData(token)).unwrap();
    } catch (error) {
      toast(t('errors.unknown', { type: 'error' }));
    }
  }, []);

  const loadingProcess = useSelector((state) => state.loading);

  const content = loadingProcess === 'pending' ? (
    <Loader
      className="align-self-center"
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
    />
  ) : (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <ChannelsPanel />
        </Col>
        <Col className="d-flex flex-column p-0 w-100 h-100">
          <Board />
        </Col>
      </Row>
    </Container>
  );

  return (
    <div className="d-flex justify-content-center flex-column h-100">
      <Header />
      <ModalRoot />
      {content}
    </div>
  );
};

export default Main;
