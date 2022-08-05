import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import toastReducer from './slices/toastSlice';

const thunkArguments = {};

export const store = configureStore({
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: thunkArguments
      }
    });
  },
  reducer: {
    modal: modalReducer,
    toast: toastReducer
  }
});

thunkArguments.store = store;
