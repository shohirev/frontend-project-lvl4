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

const ChannelPanel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(getChannels);
  const activeChannelId = useSelector(getActiveChannelId);

  const panel = channels.map((channel) => {
    const type = channel.id === activeChannelId ? 'secondary' : 'light';

    const handler = () => {
      dispatch(changingActiveChannelId(channel.id));
    };

    const dropdownBtns = channel.removable ? (
      <DropdownButton as={ButtonGroup} variant={type} title="">
        <Dropdown.Item
          eventKey="1"
          onClick={() => dispatch(changeModalType({ type: 'renamingChannel', modalProps: { id: channel.id } }))}
        >
          {t('channelsPanel.renameBtn')}
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="2"
          onClick={() => dispatch(changeModalType({ type: 'removingChannel', modalProps: { id: channel.id } }))}
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
          onClick={() => dispatch(changeModalType({ type: 'addingChannel', modalProps: {} }))}
        />
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">{panel}</ul>
    </div>
  );
};

export default ChannelPanel;
