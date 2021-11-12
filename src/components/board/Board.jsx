import React from 'react';
import BoardHeader from './BoardHeader.jsx';
import BoardInput from './BoardInput.jsx';
import MessageBox from './MessageBox.jsx';

const Board = () => (
  <div className="h-100 w-100 d-flex flex-column justify-content-between">
    <BoardHeader />
    <MessageBox />
    <BoardInput />
  </div>
);

export default Board;
