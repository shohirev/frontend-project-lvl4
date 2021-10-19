import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const modals = {
  addingChannel: AddChannel,
  renamingChannel: RenameChannel,
  removingChannel: RemoveChannel,
};

export default (modalProcess) => modals[modalProcess];
