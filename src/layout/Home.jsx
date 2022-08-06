import { Card, Containers, Icons, Navbar, ProgressBar, Skeleton } from '../components/index.js';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/slices/todosSlice';
import { useTodos } from '../services/useTodo.js';
import { colorData } from '../utils/Colors.js';

const Loading = () => (
  <>
    <Navbar />
    <Containers>
      <Skeleton />
    </Containers>
  </>
);

const ItemsCard = ({ items, todoIdx }) => {
  const refCardItems = useRef(null);
  const { deleteTodos, moveTodos } = useTodos();
  const navigate = useNavigate();

  const handleDelete = (idItems, todosId) => {
    return deleteTodos(idItems, todosId);
  };

  const handleMoveTodo = (data, key) => {
    return moveTodos({ ...data, idx: todoIdx }, key);
  };

  if (!items) return <p>Dont Have Any Items</p>;

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

const Home = () => {
  const navigate = useNavigate();
  const { data, loading, error, status } = useSelector((item) => item.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const control = new AbortController();

    dispatch(fetchTodos());

    return () => control.abort();
  }, []);

  if (error) return <p>{error}</p>;
  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Containers>
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
      </Containers>
    </>
  );
};

export default Home;
