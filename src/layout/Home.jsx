import { Containers, Navbar } from '../components/index.js';
import React from 'react';

const TodosCard = React.lazy(() => import('./TodosCard'));

const Home = () => {
  return (
    <React.Suspense fallback={<p>Loading Todos...</p>}>
      <Navbar />
      <Containers>
        <TodosCard />
      </Containers>
    </React.Suspense>
  );
};

export default Home;
