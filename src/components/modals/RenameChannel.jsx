import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSocketAPI } from '../../hooks/index.jsx';
import { getModalState, getChannelById, getChannelsNames } from '../../features/selectors.js';

const RenameChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { sendNewChannelName } = useSocketAPI();

  const { id } = useSelector(getModalState).modalProps;
  const currentChannel = useSelector(getChannelById(id));
  const channels = useSelector(getChannelsNames);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    channelName: yup.mixed().notOneOf(channels),
  });

  const handler = (values) => {
    const { newName } = values;
    sendNewChannelName({ id, name: newName });
    onHide();
  };

  return (
    <Modal show centered backdrop="static" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ newName: currentChannel.name }}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handler}
        >
          {({
            values, handleChange, handleSubmit, errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  id="newName"
                  name="newName"
                  value={values.newName}
                  onChange={handleChange}
                  ref={inputRef}
                  isInvalid={errors.newName}
                  required
                  data-testid="rename-channel"
                  label-text={t('testLabels.renameChannelInput')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('errors.channelDuplication')}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="mr-2"
                  onClick={onHide}
                >
                  {t('modals.rename.cancelBtn')}
                </Button>
                <Button variant="primary" type="submit">
                  {t('modals.rename.sendBtn')}
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
