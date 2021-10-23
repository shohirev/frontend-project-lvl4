import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChatHeader = () => {
  const channels = useSelector((state) => state.channels);
  const activeChannelId = useSelector((state) => state.activeChannelId);
  const activeChannel = channels.find((c) => c.id === activeChannelId);
  const messages = useSelector((state) => state.messages);
  const messagesAmount = messages.filter(
    (message) => message.channelId === activeChannelId,
  ).length;
  const { t } = useTranslation();

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

export default ChatHeader;
