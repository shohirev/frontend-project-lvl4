import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getActiveChannel, getMessagesByChannel } from '../../features/selectors.js';

const BoardHeader = () => {
  const activeChannel = useSelector(getActiveChannel);
  const { t } = useTranslation();

  const messagesAmount = useSelector(getMessagesByChannel).length;

  const header = activeChannel ? (
    <div className="bg-light mb-4 p-3 w-100 shadow-sm small">
      <p>
        <b>
          #
          {activeChannel.name}
        </b>
      </p>
      <span>{t('chat.key', { count: messagesAmount })}</span>
    </div>
  ) : null;

  return header;
};

export default BoardHeader;
