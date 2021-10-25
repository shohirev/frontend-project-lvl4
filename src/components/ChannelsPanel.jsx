import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
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
      <li key={channel.id} className="nav-item w-100">
        <ButtonGroup className="w-100">
          <Button
            variant={type}
            className="btn w-100 rounded-0 text-left text-truncate"
            onClick={handler}
          >
            #
            {channel.name}
          </Button>
          {dropdownBtns}
        </ButtonGroup>
      </li>
    );
  });

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center mb-2 ps-4 pe-2">
        <span>{t('channelsPanel.title')}</span>
        
          <PlusSquare
            role="button"
            color="royalblue"
            aria-label="+"
            onClick={() => setModalInfo({ type: 'addingChannel' })}
          />
        
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">{panel}</ul>
      {renderModal(modalInfo, onHide)}
    </div>
  );
};

export default ChannelPanel;
