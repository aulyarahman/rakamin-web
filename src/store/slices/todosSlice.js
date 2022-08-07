import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Axios } from '~/config/axios.config.js';
import { asyncForEach } from '~/config/async-foreach.js';

// const loading = 'idle' | 'pending' | 'succeeded' | 'failed';

export const initialState = {
  data: [],
  loading: false,
  status: 'idle',
  error: ''
};

export const fetchTodos = createAsyncThunk('todos', async (_, thunkAPI) => {
  try {
    const data = [];
    const response = await Axios.get('/todos');
    thunkAPI.dispatch(todosActions.setTodos(response.data));
    await asyncForEach(response.data, async (it, idx) => {
      const resItems = await Axios.get(`/todos/${it.id}/items`);
      data.push({
        ...it,
        idx,
        items: resItems.data
      });
    });
    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
      state.status = 'idle';
    }),
      builder.addCase(fetchTodos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.status = 'success';
      });
  }
});

export const { actions, reducer } = todosSlice;
export const todosActions = todosSlice.actions;
export default reducer;
