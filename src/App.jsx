// @ts-check
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import Card from './components/Card';
import { IconCheck, IconCircleCheck, IconFiMore } from './components/Icon';
import { Containers } from './components/Container.jsx';
import Navbar from './components/Navbar';
import Modal from './components/Modal.jsx';
import { useTodo } from './services/useTodo.js';
import { Skeleton } from './components/Skeleton';

const ItemsCard = (props) => {
  const { id } = props;
  const { data, loading } = useTodo(`/todos/${id}/items`);
  if (!id) return <p>Loading...</p>;

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {data.map((i) => {
            const percent = Number(i.progress_percentage);
            return (
              <Fragment key={i.id}>
                <div
                  className={
                    'p-4 bg-neutral border-[1px] border-[#E0E0E0] rounded-[4px] space-y-2'
                  }>
                  <p className={'font-bold text-[14px]'}>{i.name}</p>
                  {/* DASH */}
                  <div className="w-full border-[1px] border-dashed border-[#E0E0E0]" />
                  {/* PROGRESS BAR */}
                  <div className="flex gap-5 place-items-center">
                    <div className={'flex w-full gap-2'}>
                      <div className="w-full bg-gray-200 rounded-full h-[16px]">
                        <div
                          className={`${
                            percent < 100 ? 'bg-primary' : 'bg-success'
                          } h-[16px] rounded-full w-[${percent}%]`}></div>
                      </div>
                      {percent < 100 ? (
                        <p>{percent}%</p>
                      ) : (
                        <div
                          className={`bg-success flex w-[16px] h-[16px] items-center justify-center rounded-full`}>
                          <IconCheck />
                        </div>
                      )}
                    </div>
                    <IconFiMore />
                  </div>
                </div>
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

ItemsCard.propTypes = {
  id: PropTypes.number.isRequired
};

const App = () => {
  const { data, loading } = useTodo('/todos');

  return (
    <div>
      <Modal>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error exercitationem fugiat
        incidunt ipsam molestiae repellendus ut veritatis. Amet assumenda consequuntur cupiditate
        fugit labore laborum libero sunt. Nemo, similique, suscipit.
      </Modal>
      <Navbar />
      <Containers>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            {data.map((i) => (
              <Card key={i.id}>
                <div className={'p-1 w-fit border-[1px] border-primary rounded-[4px] text-sm'}>
                  {i.title}
                </div>
                <p className="font-bold text-black text-sm">{i.description}</p>
                <ItemsCard key={i.id} id={i.id} />
                <div className={'flex gap-2 cursor-pointer'}>
                  <IconCircleCheck />
                  <p>New Task</p>
                </div>
              </Card>
            ))}
          </>
        )}
      </Containers>
    </div>
  );
};

export default App;
