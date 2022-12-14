import React from 'react';
import { useTodos } from '~/services/useTodo';
import { useNavigate } from 'react-router-dom';
import { ProgressBar, Icons } from '~/components';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const ItemsCard = ({ items, todoIdx }) => {
  const { deleteTodos, moveTodos } = useTodos();
  const navigate = useNavigate();

  const handleDelete = (idItems, todosId) => {
    return deleteTodos(idItems, todosId);
  };

  const handleMoveTodo = (data, key) => {
    return moveTodos({ ...data, idx: todoIdx }, key);
  };

  const handleClickDropdown = (k, i, key) => {
    if (k <= 1) handleMoveTodo({ ...i, itemIdx: key }, k);
    if (k === 2) {
      localStorage.setItem('items', JSON.stringify(i));
      navigate(`/todos/${i.todo_id}/items/${i.id}`);
    }
    if (k === 3) handleDelete(i.id, i.todo_id);
  };

  if (!items) return <Icons.LoadingSvg />;

  return (
    <Droppable droppableId={`${todoIdx}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef} className={'space-y-2'}>
          {items.map((i, key) => {
            const percent = Number(i.progress_percentage);
            return (
              <Draggable
                key={i.id}
                draggableId={JSON.stringify(i)}
                index={key}
                shouldRespectForcePress={true}>
                {(provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                    ref={provided.innerRef}
                    className={
                      'bg-neutral border-[1px] rounded-[4px] p-3 space-y-3 cursor-pointer '
                    }>
                    <p className={'font-bold text-[14px]'}>{i.name}</p>
                    <div className="w-full border-[1px] border-dashed border-[#E0E0E0]" />
                    <ProgressBar
                      progress={percent}
                      href={`/items/add/${i.id}`}
                      todoIdx={todoIdx}
                      onClick={(k) => handleClickDropdown(k, i, key)}
                    />
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ItemsCard;
