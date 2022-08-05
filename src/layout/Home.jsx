import { Card, Containers, Icons, Navbar, ProgressBar, Skeleton } from '../components/index.js';
import React from 'react';
import { useTodo } from '../services/useTodo.js';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../utils/Colors.js';

const Loading = () => (
  <Containers>
    <Skeleton />
  </Containers>
);

const ItemsCard = ({ id }) => {
  const navigate = useNavigate();
  const { data, loading, deleteTodos } = useTodo(`/todos/${id}/items`);

  const handleDelete = (idItems) => {
    return deleteTodos(`/todos/${id}/items/${idItems}`);
  };

  if (loading) return <Loading />;

  return (
    <>
      {data.map((i) => {
        const percent = Number(i.progress_percentage);
        return (
          <div
            key={i.id}
            className={'bg-neutral border-[1px] rounded-[4px] p-3 space-y-3 cursor-pointer'}>
            <p className={'font-bold text-[14px]'}>{i.name}</p>
            <div className="w-full border-[1px] border-dashed border-[#E0E0E0]" />
            <ProgressBar
              progress={percent}
              href={`/items/add/${id}`}
              onClick={(k) => {
                if (k === 2) {
                  localStorage.setItem('items', JSON.stringify(i));
                  navigate(`/todos/${id}/items/${i.id}`);
                }
                if (k === 3) handleDelete(i.id);
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
  const { data, loading } = useTodo('/todos');
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

  const randColor = () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()
    );
  };

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Containers>
        {data.map((i) => {
          // const COLOR = ['#F7FEFF', '#FFFCF5', '#FFFAFA', 'F8FBF9'];
          const colors = Math.floor((Math.random() * colorData.length) | 0);
          return (
            <Card
              key={i.id}
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
              <ItemsCard key={i.id} id={i.id} />
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
