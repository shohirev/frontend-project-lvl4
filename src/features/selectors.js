import { createSelector } from '@reduxjs/toolkit';

export const getLoadingProcess = (state) => state.loading;
export const getChannels = (state) => state.channels.channelsData;
export const getMessages = (state) => state.messages;
export const getActiveChannelId = (state) => state.channels.activeId;
export const getModalState = (state) => state.modal;

export const getActiveChannel = createSelector(
  [getChannels, getActiveChannelId],
  (channels, id) => channels.find((c) => c.id === id),
);

export const getChannelById = (id) => createSelector(
  [getChannels],
  (channels) => channels.find((c) => c.id === id),
);

export const getChannelsNames = createSelector(
  [getChannels],
  (channels) => channels.map((c) => c.name),
);

export const getMessagesByChannel = createSelector(
  [getActiveChannelId, getMessages],
  (id, messages) => messages.filter((m) => m.channelId === id),
);
