import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { addingChannel, removingChannel } from '../features/channelsSlice.js';

let socket = io();

export default socket;
