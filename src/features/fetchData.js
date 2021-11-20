import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'fetchData',
  async (headers) => {
    const response = await axios.get(routes.data(), { headers });
    return response.data;
  },
);

export default fetchData;
