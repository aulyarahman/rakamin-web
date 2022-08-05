import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useConfirmationToastManagement from '../../hooks/useToastConfirm';

export const initialState = {
  isOpened: false,
  isConfirmed: false,
  isFailed: false,
  status: 'success' | 'error' | 'pending' | undefined,
  message: ''
};

export const toastThunkActions = {
  open: createAsyncThunk('toast', async (_, thunkAPI) => {
    const store = thunkAPI.extra?.store;
    thunkAPI.dispatch(confirmationToastActions.open());
    return new Promise((resolve, reject) => {
      const unsubscribe = store.subscribe(() => {
        const state = thunkAPI.getState();
        if (state?.modal.isConfirmed) {
          unsubscribe();
          resolve(true);
        }
        if (state?.modal.isFailed) {
          unsubscribe();
          reject(false);
        }
      });
    });
  })
};

const confirmationToastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpened = true;
      state.isFailed = false;
      state.isConfirmed = false;
      state.status = 'pending';
    },
    success: (state) => {
      state.isConfirmed = true;
      state.isOpened = false;
      state.status = 'success';
    },
    failed: (state) => {
      state.isFailed = true;
      state.isOpened = false;
      state.status = 'error';
    },
    setStatus: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.isOpened = action.payload.isOpened;
    }
  }
});

const { reducer, actions } = confirmationToastSlice;
export const confirmationToastActions = confirmationToastSlice.actions;

export default reducer;
