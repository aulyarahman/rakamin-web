import React, { useEffect, useRef } from 'react';
import { useTodos } from '~/services/useTodo';
import { useNavigate } from 'react-router-dom';
import { ProgressBar, Icons } from '~/components';

const ItemsCard = ({ items, todoIdx }) => {
  const refCardItems = useRef(null);
  const { deleteTodos, moveTodos } = useTodos();
  const navigate = useNavigate();

  useEffect(() => {
    const element = refCardItems.current;

    element?.addEventListener('mouseover', () => {
      setHoverClick;
    });

    return () => {
      element?.addEventListener('mouseover', () => {
        setHoverClick;
      });
    };
  }, []);

  const handleDelete = (idItems, todosId) => {
    return deleteTodos(idItems, todosId);
  };

  const handleMoveTodo = (data, key) => {
    return moveTodos({ ...data, idx: todoIdx }, key);
  };

  const setHoverClick = (e) => {
    console.log('Ev', e);
  };

  if (!items) return <Icons.LoadingSvg />;

  return (
    <>
      {items.map((i, key) => {
        const percent = Number(i.progress_percentage);
        return (
          <div
            ref={refCardItems}
            key={key}
            draggable={true}
            className={
              'bg-neutral border-[1px] rounded-[4px] p-3 space-y-3 cursor-pointer transition duration-150 hover:transform hover:scale-[1.03] '
            }>
            <p className={'font-bold text-[14px]'}>{i.name}</p>
            <div className="w-full border-[1px] border-dashed border-[#E0E0E0]" />
            <ProgressBar
              progress={percent}
              href={`/items/add/${i.id}`}
              onClick={(k) => {
                if (k <= 1) {
                  handleMoveTodo({ ...i, itemIdx: key }, k);
                }
                if (k === 2) {
                  localStorage.setItem('items', JSON.stringify(i));
                  navigate(`/todos/${i.todo_id}/items/${i.id}`);
                }
                if (k === 3) handleDelete(i.id, i.todo_id);
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default ItemsCard;
