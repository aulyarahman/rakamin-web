import { FormInput } from '~/components';
import React, { useState } from 'react';
import WrapForm from './WrapForm';
import { useParams } from 'react-router-dom';
import { ModalContent } from '~/components/ActionSlide/ModalContent';
import { useTodos } from '~/services/useTodo';

const CreateItems = () => {
  const { id } = useParams();
  const [data, setData] = useState({ name: '', progress_percentage: '' });
  const { create } = useTodos();

  const handleChange = (e) => {
    setData((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await create(id, data);
  };

  return (
    <ModalContent type={'page'} title={'Create Task'}>
      <WrapForm cb={handleSubmit}>
        <FormInput
          required={true}
          label={'Task Name'}
          id={'name'}
          placeholder={'Type your Task'}
          onChange={handleChange}
        />
        <FormInput
          required={true}
          type={'number'}
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
