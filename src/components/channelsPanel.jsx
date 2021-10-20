import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { changingActiveChannelId } from '../features/activeChannelIdSlice.js';
import getModal from './modals/index.js';

const renderModal = (modalInfo, onHide) => {
  const { id, type } = modalInfo;

  if (!type) {
    return null;
  }

  const Modal = getModal(type);
  return <Modal id={id || null} onHide={onHide} />;
};

const ChannelPanel = () => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels);
  const activeChannelId = useSelector((state) => state.activeChannelId);

  const [modalInfo, setModalInfo] = useState({});
  const onHide = () => setModalInfo({ type: null });

  const dispatch = useDispatch();

  const panel = channels.map((channel) => {
    const type = channel.id === activeChannelId ? 'secondary' : 'light';

    const handler = () => {
      dispatch(changingActiveChannelId(channel.id));
    };

    const dropdownBtns = channel.removable ? (
      <DropdownButton as={ButtonGroup} variant={type} title="">
        <Dropdown.Item
          eventKey="1"
          onClick={() => setModalInfo({ id: channel.id, type: 'renamingChannel' })}
        >
          {t('channelsPanel.renameBtn')}
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => setModalInfo({ id: channel.id, type: 'removingChannel' })}
        >
          {t('channelsPanel.removeBtn')}
        </Dropdown.Item>
      </DropdownButton>
    ) : null;

    return (
      <ButtonGroup key={channel.id}>
        <Button variant={type} onClick={handler}>
          #
          {channel.name}
        </Button>
        {dropdownBtns}
      </ButtonGroup>
    );
  });

  return (
    <Container>
      <Col>
        {t('channelsPanel.title')}
        <Button
          className="ms-auto"
          color="royalblue"
          onClick={() => setModalInfo({ type: 'addingChannel' })}
        >
          +
        </Button>
        <ButtonGroup vertical>{panel}</ButtonGroup>
      </Col>
      {renderModal(modalInfo, onHide)}
    </Container>
  );
};

export default ChannelPanel;
