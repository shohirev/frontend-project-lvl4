import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const AddChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();
  const inputRef = useRef();
  const [channelName, setChannelName] = useState('');
  const [isInvalidName, setIsInvalidName] = useState(null);
  const channels = useSelector((state) => state.channels);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (channels.find((c) => c.name === channelName)) {
      setIsInvalidName(true);
      return;
    }
    onHide();
    socket.client.emit('newChannel', { name: channelName }, () => {});
  };

  return (
    <Modal show centered backdrop="static" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-around">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              value={channelName}
              ref={inputRef}
              isInvalid={isInvalidName}
              required
              data-testid="add-channel"
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              {t('errors.channelDuplication')}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="d-flex justify-content-end">
            <Button
              variant="secondary"
              className="mr-2"
              type="submit"
              onClick={onHide}
            >
              {t('modals.add.cancelBtn')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modals.add.sendBtn')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
