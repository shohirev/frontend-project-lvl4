import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const initialState = 'idle';

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, () => 'pending');
    builder.addCase(fetchData.fulfilled, () => 'idle');
  },
});

export default loadingSlice.reducer;
