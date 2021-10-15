import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const AddChannel = ({ onHide }) => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState('');
  const [isInvalidName, setIsInvalidName] = useState(null);
  const channels = useSelector((state) => state.channels);
  const socket = useSocket();
  const inputRef = useRef();

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
    socket.emit('newChannel', {name: channelName});
  };

  return (
    <Modal show={true} centered={true} backdrop="static" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            value={channelName}
            ref={inputRef}
            isInvalid={isInvalidName}
            data-testid="add-channel"
            onChange={(e) => { setChannelName(e.target.value ) }}
          />
          <Button variant="secondary" type="submit" onClick={onHide}>
            {t('modals.add.cancelBtn')}
          </Button>
          <Button variant="primary" type="submit">
            {t('modals.add.sendBtn')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
