import { Axios } from '~/config/axios.config';
import useConfirmationModalManagement from '~/hooks/useConfirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { todosActions } from '~/store/slices/todosSlice';
import useConfirmationToastManagement from '~/hooks/useToastConfirm.js';

/**
 * CUSTOM HOOK FOR ACTION TODOS
 * @returns {create, update, deleteTodos, moveTodos, moveTodosDraggable}
 */
export const useTodos = () => {
  const { setStatus } = useConfirmationToastManagement();
  const { open } = useConfirmationModalManagement();
  const dispatch = useDispatch();
  const { data } = useSelector((i) => i.todos);

  /**
   * CREATE ITEMS
   * @param params,req
   * @returns {Promise<void>}
   */
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
      dispatch(todosActions.setTodos(findTodos));
      setStatus('success', `Success Create Items`, true);
    } catch (error) {
      setStatus('error', error.response.data);
    }
  };

  /**
   * UPDATE ITEMS
   * @param {req, itemId, todoId}
   * @returns {Promise<void>}
   */
  const update = async ({ itemId, todoId }, req) => {
    const toNumItemId = Number(itemId);
    const toNumtodoId = Number(todoId);
    const reqData = {
      target_todo_id: todoId,
      name: req.name,
      progress_percentage: req.progress_percentage
    };
    try {
      setStatus('pending', 'Loading..', true);
      await Axios.patch(`/todos/${toNumtodoId}/items/${toNumItemId}`, req);
      const findsTodos = data.find((i) => i.id === toNumtodoId);
      const updateItems = findsTodos.items.map((i) => {
        if (i.id === toNumItemId) {
          return {
            ...i,
            ...reqData
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
      dispatch(todosActions.setTodos(updates));
      setStatus('success', `Success Update Items`, true);
    } catch (error) {
      setStatus('error', error.response.data);
    }
  };

  /**
   * DELETE ITEMS
   * @param itemId ,todoId
   * @returns {Promise<void>}
   */
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
            return {
              ...i,
              items: i.items.filter((item) => item.id !== toNumItemId)
            };
          }
          return i;
        });
        dispatch(todosActions.setTodos(removeItems));
        setStatus('success', `Success Delete Items`, true);
      } catch (e) {
        setStatus('error', e.response.data);
        console.error(e);
      }
    }
  };

  /**
   * REUSE FUNCTION FOR MOVING ITEMS TODOS
   * @param args
   * @returns {Promise<*>}
   */
  const moveTask = async (args) => {
    const todoFrom = args.req.todo_id;
    const todoDest = data[args.dest];
    const reqData = {
      name: args.req.name,
      progress_percentage: args.req.progress_percentage
    };
    const create = await Axios.post(`/todos/${todoDest.id}/items`, reqData);
    Axios.delete(`/todos/${todoFrom}/items/${args.req.id}`);

    const patch = data.map((i) => {
      if (i.idx === args.dest) {
        return {
          ...i,
          items: [...i.items, create?.data]
        };
      }
      if (i.idx === args.source) {
        return {
          ...i,
          items: i.items.filter((item) => item.id !== Number(args.req.id))
        };
      }
      return i;
    });

    return patch;
  };

  /**
   * 1 IS MEAN DECREASE AND 0 INCREASE THE INCREMENT
   * MOVING TOODS WITH BUTTON DROP DOWN
   * @param {req, key}
   * @returns {Promise<void>}
   */
  const moveTodos = async (req, key) => {
    const operator = key === 0 ? Number(req.idx + 1) : key === 1 ? Number(req.idx - 1) : undefined;
    const findTodos = await moveTask({ dest: operator, source: Number(req.idx), req });
    dispatch(todosActions.setTodos(findTodos));
  };

  /**
   * MOVING TODOS WITH DRAGGABLE
   * @param req
   * @returns {Promise<void>}
   */
  const moveTodosDraggable = async (req) => {
    const findTodos = await moveTask({
      dest: req.idTodoDestination,
      source: req.idTodoFrom,
      req: req.items
    });

    dispatch(todosActions.setTodos(findTodos));
  };

  return {
    deleteTodos,
    update,
    create,
    moveTodos,
    moveTodosDraggable
  };
};

// itemIdx
// id(pin):1442
// name(pin):"Group Of Task 3"
// done(pin):null
// todo_id(pin):3
// created_at(pin):"2022-08-06T02:26:14.348Z"
// updated_at(pin):"2022-08-06T08:18:57.459Z"
// progress_percentage(pin):90
