import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Home from '~/layout/Home';
import CreateItems from '~/layout/CreateItems.jsx';
import { ModalConfirmation } from '~/components/ActionSlide/ModalContent';
import UpdateItems from '~/layout/UpdateItems';

const App = () => {
  const location = useLocation();
  return (
    <div>
      <ModalConfirmation />
      {/* */}
      <Routes location={location}>
        <Route element={<Home />} path={`/`}>
          <Route element={<CreateItems />} path={`/items/add/:id`} />
          <Route element={<UpdateItems />} path={`/todos/:idTodos/items/:idItems`} />
        </Route>
      </Routes>

      {/*  */}
      <Routes>
        <Route element={<CreateItems />} path={`/items/add/:id`} />
        <Route element={<UpdateItems />} path={`/todos/:idTodos/items/:idItems`} />
      </Routes>
    </div>
  );
};

export default App;
