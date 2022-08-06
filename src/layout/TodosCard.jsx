import { Card, Containers, Icons, Navbar, ProgressBar, Skeleton } from '../components/index.js';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/slices/todosSlice';
import { colorData } from '../utils/Colors';
import { LoadingSvg } from '../components/Icon';

const ItemsCard = React.lazy(() => import('./ItemsCard'));

const TodosCard = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((item) => item.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const control = new AbortController();

    dispatch(fetchTodos());

    return () => control.abort();
  }, []);

  if (!data.length) return <LoadingSvg />;

  return (
    <>
      {data.map((i, k) => {
        const colors = Math.floor((Math.random() * colorData.length) | 0);
        return (
          <Card
            key={k}
            className={``}
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
    </>
  );
};

export default TodosCard;
