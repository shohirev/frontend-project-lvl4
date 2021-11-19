import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { changingActiveChannelId } from '../features/channelsSlice.js';
import { changeModalType } from '../features/modalSlice.js';
import { getChannels, getActiveChannelId } from '../features/selectors.js';

const ChannelBtn = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeChannelId = useSelector(getActiveChannelId);
  const { id, name, removable } = channel;

  const type = id === activeChannelId ? 'secondary' : 'light';

  const dropdown = (
    <DropdownButton as={ButtonGroup} variant={type} title="">
      <Dropdown.Item
        eventKey="1"
        onClick={() => dispatch(changeModalType({ type: 'renamingChannel', modalProps: { id } }))}
      >
        {t('channelsPanel.renameBtn')}
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="2"
        onClick={() => dispatch(changeModalType({ type: 'removingChannel', modalProps: { id } }))}
      >
        {t('channelsPanel.removeBtn')}
      </Dropdown.Item>
    </DropdownButton>
  );

  return (
    <ButtonGroup className="w-100">
      <Button
        variant={type}
        className="btn w-100 rounded-0 text-left text-truncate"
        onClick={() => dispatch(changingActiveChannelId(id))}
      >
        #
        {name}
      </Button>
      {removable && dropdown}
    </ButtonGroup>
  );
};

const ChannelsList = () => {
  const channels = useSelector(getChannels);

  const channelsList = channels.map((channel) => (
    <li key={channel.id} className="nav-item w-100">
      <ChannelBtn channel={channel} />
    </li>
  ));

  return (
    <ul className="nav flex-column nav-pills nav-fill px-2">{channelsList}</ul>
  );
};

const ChannelPanel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center mb-2 ps-4 pe-2">
        <span>{t('channelsPanel.title')}</span>
        <PlusSquare
          role="button"
          color="royalblue"
          aria-label="+"
          onClick={() => dispatch(changeModalType({ type: 'addingChannel', modalProps: {} }))}
        />
      </div>
      <ChannelsList />
    </div>
  );
};

export default ChannelPanel;
