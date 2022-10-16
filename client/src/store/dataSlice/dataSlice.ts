import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { dataApi } from '../../api/api';
import { IData } from '../../types/data.interface';
import { LoadingStatuses } from '../../types/loadingStatuses';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  return dataApi.fetchData();
});

export interface DataState {
  image: string;
  propertyes: number[];

  status: LoadingStatuses;
}

const initialState: DataState = {
  image: '',
  propertyes: [],

  status: LoadingStatuses.PENDING,
};

export const dataSlice = createSlice({
  name: 'data',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.image = action.payload.image;
        state.propertyes = Object.values(action.payload.propertyes);
        state.status = LoadingStatuses.FULFILED;
      })
      .addCase(fetchData.pending, (state) => {
        state.status = LoadingStatuses.PENDING;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = LoadingStatuses.REJECTED;
      });
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
