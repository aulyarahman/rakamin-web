import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import toastReducer from './slices/toastSlice';
import todosReducer from './slices/todosSlice';

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
    toast: toastReducer,
    todos: todosReducer
  }
});

thunkArguments.store = store;
