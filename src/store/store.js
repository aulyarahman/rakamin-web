import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './slices/modalSlice.jsx'

const thunkArguments = {}

export const store = configureStore({
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: thunkArguments,
      },
    })
  },
  reducer: {
    modal: modalReducer,
  },
});

thunkArguments.store = store
