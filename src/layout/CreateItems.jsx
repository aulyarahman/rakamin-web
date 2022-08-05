import { FormInput } from '../components';
import React, { useState } from 'react';
import WrapForm from './WrapForm';
import { useTodo } from '../services/useTodo';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalContent } from '../components/ActionSlide/ModalContent';

const CreateItems = () => {
  const { id } = useParams();
  const [data, setData] = useState({ name: '', progress_percentage: '' });
  const { create, isLoading } = useTodo(`/todos/${id}/items`);

  const handleChange = (e) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create(data);
  };

  return (
    <ModalContent type={'page'} title={'Create Task'}>
      <WrapForm cb={handleSubmit} isLoading={isLoading}>
        <FormInput
          label={'Task Name'}
          id={'name'}
          placeholder={'Type your Task'}
          onChange={handleChange}
        />
        <FormInput
          label={'Progress'}
          id={'progress_percentage'}
          placeholder={'70%'}
          onChange={handleChange}
        />
      </WrapForm>
    </ModalContent>
  );
};

export default CreateItems;
