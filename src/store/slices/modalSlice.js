import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialConfirmationModalState = {
  isOpened: false,
  isConfirmed: false,
  isDeclined: false,
  type: ''
};

export const confirmationModalThunkActions = {
  open: createAsyncThunk('confirmationModal', async (_, thunkAPI) => {
    const store = thunkAPI.extra?.store;
    thunkAPI.dispatch(confirmationModalActions.open());
    return new Promise((resolve, reject) => {
      const unsubscribe = store.subscribe(() => {
        const state = thunkAPI.getState();

        if (state?.modal.isConfirmed) {
          unsubscribe();
          resolve(true);
        }
        if (state?.modal.isDeclined) {
          unsubscribe();
          reject(false);
        }
      });
    });
  })
};

const confirmationModalSlice = createSlice({
  name: 'confirmationModal',
  initialState: initialConfirmationModalState,
  reducers: {
    open: (state) => {
      state.isOpened = true;
      state.isDeclined = false;
      state.isConfirmed = false;
      state.type = 'confirm';
    },
    confirm: (state) => {
      state.isConfirmed = true;
      state.isOpened = false;
      state.type = '';
    },
    decline: (state) => {
      state.isDeclined = true;
      state.isOpened = false;
      state.type = '';
    },
    setContent: (_, action) => {
      return { content: action.payload.content };
    }
  }
});

const { reducer, actions } = confirmationModalSlice;
export const confirmationModalActions = confirmationModalSlice.actions;

export default reducer;
