import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'fetchData',
  async (token) => {
    const response = await axios.get(routes.data(), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
);

export default fetchData;
