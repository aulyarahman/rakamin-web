import { FormInput } from '../components';
import React, { useState } from 'react';
import WrapForm from './WrapForm';
import { ModalContent } from '../components/ActionSlide/ModalContent';

const CreateTodos = () => {
  const [data, setData] = useState({ title: '', description: '' });

  const handleChange = (e) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <ModalContent title={'Create Task'} type={'page'}>
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
    </ModalContent>
  );
};

export default CreateTodos;
