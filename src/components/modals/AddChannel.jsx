import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useSocketAPI } from '../../hooks/index.jsx';
import { getChannelsNames } from '../../features/selectors.js';

const AddChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const { sendChannel } = useSocketAPI();
  const inputRef = useRef();
  const channels = useSelector(getChannelsNames);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    channelName: yup.mixed().notOneOf(channels),
  });

  const handler = (values) => {
    const { channelName } = values;
    sendChannel({ name: channelName });
    onHide();
  };

  return (
    <Modal show centered backdrop="static" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-around">
        <Formik
          initialValues={{ channelName: '' }}
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
                  id="channelName"
                  name="channelName"
                  value={values.channelName}
                  ref={inputRef}
                  isInvalid={errors.channelName}
                  required
                  data-testid="add-channel"
                  aria-label={t('testLabels.newChannelInput')}
                  onChange={handleChange}
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
                  {t('modals.add.cancelBtn')}
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  {t('modals.add.sendBtn')}
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
