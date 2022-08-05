import { FormInput } from '../components';
import React, { useEffect, useState } from 'react';
import WrapForm from './WrapForm';
import { useTodo } from '../services/useTodo';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalContent } from '../components/ActionSlide/ModalContent';

const UpdateItems = () => {
  const { idTodos, idItems } = useParams();
  const [data, setData] = useState({ name: '', progress_percentage: '' });
  const { update, isLoading } = useTodo(`/todos/${idTodos}/items/${idItems}`);

  useEffect(() => {
    const data = localStorage.getItem('items');
    const toJSON = JSON.parse(String(data));
    setData({
      name: toJSON.name,
      target_todo_id: toJSON.todo_id,
      progress_percentage: toJSON.progress_percentage
    });
  }, []);

  const handleChange = (e) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update(data);
  };

  return (
    <ModalContent type={'page'} title={'Create Task'}>
      <WrapForm cb={handleSubmit} isLoading={isLoading}>
        <FormInput
          label={'Task Name'}
          id={'name'}
          value={data.name}
          placeholder={'Type your Task'}
          onChange={handleChange}
        />
        <FormInput
          label={'Progress'}
          id={'progress_percentage'}
          value={data.progress_percentage}
          placeholder={'70%'}
          onChange={handleChange}
        />
      </WrapForm>
    </ModalContent>
  );
};

export default UpdateItems;
