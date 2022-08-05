import { Card, Containers, Icons, Navbar, ProgressBar, Skeleton } from '../components/index.js';
import React from 'react';
import { useTodo } from '../services/useTodo.js';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Loading = () => (
  <Containers>
    <Skeleton />
  </Containers>
);

const ItemsCard = (props) => {
  const { id } = props;
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

ItemsCard.propTypes = {
  id: PropTypes.number.isRequired
};

const Home = () => {
  const navigate = useNavigate();
  const { data, loading } = useTodo('/todos');

  if (loading) return <Loading />;

  return (
    <>
      <Navbar />
      <Containers>
        {data.map((i) => (
          <Card key={i.id} className={`bg-[#fffcf5] border-[#FEEABC]`}>
            <div className={'p-1 w-fit border-[1px] border-primary rounded-[4px] text-sm'}>
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
        ))}
      </Containers>
    </>
  );
};

export default Home;
