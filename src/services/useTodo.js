import { Axios } from '../config/axios.config';
import useConfirmationModalManagement from '../hooks/useConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { todosActions } from '../store/slices/todosSlice';
import useConfirmationToastManagement from '../hooks/useToastConfirm.js';

export const useTodos = () => {
  const { setStatus } = useConfirmationToastManagement();
  const { open } = useConfirmationModalManagement();
  const dispatch = useDispatch();
  const { data } = useSelector((i) => i.todos);

  const create = async (params, req) => {
    try {
      const toNum = Number(params);
      setStatus('pending', 'Loading..', true);
      const result = await Axios.post(`/todos/${toNum}/items`, req);
      const resData = result.data;
      const findTodos = data.map((i) => {
        if (i.id === toNum) {
          return {
            ...i,
            items: [...i.items, resData]
          };
        }
        return i;
      });
      dispatch(todosActions.addTodos(findTodos));
      setStatus('success', `Success Create Items`, true);
    } catch (error) {
      setStatus('error', error.response.data);
    }
  };

  const update = async ({ itemId, todoId }, req) => {
    const toNumItemId = Number(itemId);
    const toNumtodoId = Number(todoId);
    try {
      setStatus('pending', 'Loading..', true);
      await Axios.patch(`/todos/${toNumtodoId}/items/${toNumItemId}`, req);
      const findsTodos = data.find((i) => i.id === toNumtodoId);
      const updateItems = findsTodos.items.map((i) => {
        if (i.id === toNumItemId) {
          return {
            ...i,
            name: req.name,
            progress_percentage: req.progress_percentage
          };
        }
        return i;
      });
      const updates = data.map((i) => {
        if (i.id === toNumtodoId) {
          return {
            ...i,
            items: updateItems
          };
        }
        return i;
      });
      dispatch(todosActions.addTodos(updates));
      setStatus('success', `Success Update Items`, true);
    } catch (error) {
      setStatus('error', error.response.data);
    }
  };

  const deleteTodos = async (itemId, todoId) => {
    const toNumItemId = Number(itemId);
    const toNumtodoId = Number(todoId);
    const isConfirm = await open();
    if (isConfirm) {
      try {
        setStatus('pending', 'Loading..', true);
        await Axios.delete(`/todos/${toNumtodoId}/items/${toNumItemId}`);
        const removeItems = data.map((i) => {
          if (i.id === toNumtodoId) {
            return i.items.filter((item) => item.id !== toNumItemId);
          }
          return i;
        });
        dispatch(todosActions.addTodos(removeItems));
        setStatus('success', `Success Delete Items`, true);
      } catch (e) {
        setStatus('error', e.response.data);
        console.error(e);
      }
    }
  };

  return {
    deleteTodos,
    update,
    create
  };
};
