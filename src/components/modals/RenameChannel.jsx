import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';
import { changeModalType } from '../../features/modalSlice.js';

const RenameChannel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const socket = useSocket();

  const channels = useSelector((state) => state.channels);
  const id = useSelector((state) => state.modal.modalProps.id);
  const currentChannel = channels.find((c) => c.id === id);
  const [newName, setNewName] = useState(currentChannel.name);

  const [isInvalidName, setIsInvalidName] = useState(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onHide = () => {
    dispatch(changeModalType({ type: null, modalProps: {} }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (channels.find((c) => c.name === newName)) {
      setIsInvalidName(true);
      return;
    }
    onHide();
    socket.emit('renameChannel', { id, name: newName }, () => {});
  };

  return (
    <Modal show centered backdrop="static" onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              value={newName}
              ref={inputRef}
              isInvalid={isInvalidName}
              required
              data-testid="rename-channel"
              onChange={(e) => setNewName(e.target.value)}
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
              {t('modals.rename.cancelBtn')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modals.rename.sendBtn')}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
