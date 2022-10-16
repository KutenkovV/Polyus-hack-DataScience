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
  propertyes: number[][];

  status: LoadingStatuses;
}

const initialState: DataState = {
  image: '',
  propertyes: [[], [], [], [], [], [], [], []],

  status: LoadingStatuses.PENDING,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.image = action.payload.image;
        const result = [];
        const numbes = Object.values(action.payload.propertyes);
        for (let i = 0; i < numbes.length; i++) {
          if (numbes[i].length > 0) {
            const all = numbes[i].reduce((all, num) => (all += num), 0);
            console.log(all);
            console.log(numbes[i].length);
            state.propertyes[i].push(all / numbes[i].length);
          } else {
            state.propertyes[i].push(0);
          }
        }

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
