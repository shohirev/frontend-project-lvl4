import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const RemoveChannel = ({ id, onHide }) => {
  const { t } = useTranslation();
  const socket = useSocket();

  const remove = () => {
    onHide();
    socket.client.emit('removeChannel', { id }, () => {});
  };

  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-around">
        <p className="lead">{t('modals.remove.insurance')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="mr-2"
            type="submit"
            onClick={onHide}
          >
            {t('modals.remove.cancelBtn')}
          </Button>
          <Button variant="danger" type="submit" onClick={remove}>
            {t('modals.remove.removeBtn')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
