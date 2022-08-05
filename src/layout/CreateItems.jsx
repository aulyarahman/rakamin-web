import { Modal, FormInput } from '../components';
import React, { useState } from 'react';
import WrapForm from './WrapForm';
import { useTodo } from '../services/useTodo';
import { useNavigate, useParams } from 'react-router-dom';

const CreateItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <Modal isOpen={true} setIsOpen={() => navigate('/')}>
      <WrapForm cb={handleSubmit}>
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
    </Modal>
  );
};

export default CreateItems;
