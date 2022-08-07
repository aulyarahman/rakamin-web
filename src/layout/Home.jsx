import { Containers, Navbar } from '~/components';
import React from 'react';
import TodosCard from './TodosCard';

const Home = () => {
  return (
    <>
      <Navbar />
      <Containers>
        <TodosCard />
      </Containers>
    </>
  );
};

export default Home;
