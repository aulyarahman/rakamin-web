import { Modal, FormInput } from '../components';
import { PropTypes } from 'prop-types';
import React, { useState } from 'react';
import WrapForm from './WrapForm';
import { useTodo } from '../services/useTodo';
import { useNavigate } from 'react-router-dom';

const CreateTodos = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ title: '', description: '' });
  const { create, isLoading } = useTodo('/todos');

  const handleChange = (e) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create(data);
  };

  return (
    <Modal isOpen={true} setIsOpen={() => navigate('/', { replace: true })}>
      <WrapForm cb={handleSubmit}>
        <FormInput
          label={'Title'}
          id={'title'}
          placeholder={'Type your title'}
          onChange={handleChange}
        />
        <FormInput
          label={'Description'}
          id={'description'}
          placeholder={'70*'}
          onChange={handleChange}
        />
      </WrapForm>
    </Modal>
  );
};

CreateTodos.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
};

export default CreateTodos;
