import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import socket from '../../socket/index.js';

const RemoveChannel = ({ id, onHide }) => {
  const { t } = useTranslation();
  const remove = () => {
    onHide();
    socket.emit('removeChannel', {id});
  };

  return (
    <Modal show={true} centered={true} onHide={onHide}>
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
