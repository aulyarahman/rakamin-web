import { Card, Containers, Icons, Navbar, ProgressBar, Skeleton } from '../components/index.js';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/slices/todosSlice';
import { useTodos } from '../services/useTodo.js';

const Loading = () => (
  <>
    <Navbar />
    <Containers>
      <Card>
        <Skeleton />
      </Card>
    </Containers>
  </>
);

const ItemsCard = ({ items }) => {
  const refCardItems = useRef(null);
  const { deleteTodos } = useTodos();
  const navigate = useNavigate();

  const handleDelete = (idItems, todosId) => {
    return deleteTodos(idItems, todosId);
  };

  if (!items) return <p>Dont Have Any Items</p>;

  return (
    <>
      {items.map((i, k) => {
        const percent = Number(i.progress_percentage);
        return (
          <div
            ref={refCardItems}
            key={k}
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
  const { data, loading, error } = useSelector((item) => item.todos);
  const dispatch = useDispatch();
  const colorData = [
    {
      bg: '#F8FBF9',
      border: '#B8DBCA',
      color: '#43936C'
    },
    {
      bg: '#FFFAFA',
      border: '#F5B1B7',
      color: '#E11428'
    },
    {
      bg: '#FFFCF5',
      border: '#FEEABC',
      color: '#FA9810'
    },
    {
      bg: '#F7FEFF',
      border: '#41B0B7',
      color: '#01959F'
    }
  ];

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
              <ItemsCard key={i.id} items={i.items} />
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
