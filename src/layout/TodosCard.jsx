import { Card, Icons } from '~/components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '~/store/slices/todosSlice';
import { colorData } from '~/utils/Colors';
import { LoadingSvg } from '~/components/Icon';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTodos } from '~/services/useTodo.js';
import ItemsCard from './ItemsCard';

const TodosCard = () => {
  const navigate = useNavigate();
  const { data, error } = useSelector((item) => item.todos);
  const dispatch = useDispatch();
  const { moveTodosDraggable } = useTodos();

  useEffect(() => {
    const control = new AbortController();

    dispatch(fetchTodos());

    return () => control.abort();
  }, []);

  const handleOnDragEnd = (e) => {
    // e: { combine, destination -> droppableId, index, draggableId, source -> droppableId, index }
    if (!e.destination) return;
    if (e.destination.droppableId === e.source.droppableId) return;
    return moveTodosDraggable({
      idTodoFrom: Number(e.source.droppableId),
      idTodoDestination: Number(e.destination.droppableId),
      items: JSON.parse(e.draggableId) // JSON DATA FROM ITEMS
    });
  };

  if (error) return <p>{error}</p>;
  if (!data.length) return <LoadingSvg />;

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {data.map((i, k) => {
          const colors = Math.floor((Math.random() * colorData.length) | 0);
          return (
            <Card
              key={k}
              style={{
                backgroundColor: colorData[colors].bg,
                border: '1px solid' + colorData[colors].border
              }}>
              <div
                className={'px-2 py-1 w-fit border-[1px] rounded-[4px] text-sm'}
                style={{
                  border: '1px solid' + colorData[colors].border,
                  color: colorData[colors].color
                }}>
                {i.title}
              </div>
              <p className="font-bold text-black text-sm">{i.description}</p>
              <ItemsCard key={i.id} items={i.items} todoIdx={i.idx} />
              <div
                className={'flex gap-2 cursor-pointer'}
                onClick={() => navigate(`/items/add/${i.id}`)}>
                <Icons.IconCircleCheck />
                <p>New Task</p>
              </div>
            </Card>
          );
        })}
      </DragDropContext>
    </>
  );
};

export default TodosCard;
