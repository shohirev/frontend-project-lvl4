import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const RenameChannel = ({ id, onHide }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels);
  const socket = useSocket();
  const currentChannel = channels.find((c) => c.id === id);
  const [newName, setNewName] = useState(currentChannel.name);
  const [isInvalidName, setIsInvalidName] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (channels.find((c) => c.name === newName)) {
      setIsInvalidName(true);
      return;
    }
    onHide();
    socket.emit('renameChannel', {id, name: newName}, () => {});
  };

  return (
    <Modal show={true} centered={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            value={newName}
            isInvalid={isInvalidName}
            data-testid="rename-channel"
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button variant="secondary" type="submit" onClick={onHide}>
            {t('modals.rename.cancelBtn')}
          </Button>
          <Button variant="primary" type="submit">
            {(t('modals.rename.sendBtn'))}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
