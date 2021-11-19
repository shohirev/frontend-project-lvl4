import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getModalState } from '../../features/selectors.js';
import { changeModalType } from '../../features/modalSlice.js';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  addingChannel: AddChannel,
  renamingChannel: RenameChannel,
  removingChannel: RemoveChannel,
};

const ModalRoot = () => {
  const dispatch = useDispatch();
  const { type } = useSelector(getModalState);
  const onHide = () => dispatch(changeModalType({ type: null, modalProps: {} }));

  if (type) {
    const Modal = modals[type];
    return <Modal onHide={onHide} />;
  }
  return null;
};

export default ModalRoot;
