import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const RemoveChannel = ({ id, onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();

  const remove = () => {
    onHide();
    socket.emit('removeChannel', { id }, () => {});
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.remove.insurance')}
        <Button variant="secondary" type="submit" onClick={onHide}>
          {t('modals.remove.cancelBtn')}
        </Button>
        <Button variant="primary" type="submit" onClick={remove}>
          {t('modals.remove.removeBtn')}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
