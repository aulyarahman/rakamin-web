import { Buttons } from '../components/Button';
import React from 'react';
import { PropTypes } from 'prop-types';

const WrapForm = ({ children, cb, isLoading = false }) => {
  return (
    <form onSubmit={cb} className={'h-full space-y-2'}>
      {children}
      <div className={'flex justify-between'}>
        <div />
        <div className={'flex bottom-6 right-6 space-x-4 mt-5'}>
          <Buttons variant={'outline'} className={'font-bold'}>
            Cancel
          </Buttons>
          <Buttons type={'submit'} className={'font-bold'} isLoading={isLoading}>
            Save Task
          </Buttons>
        </div>
      </div>
    </form>
  );
};

WrapForm.PropTypes = {
  children: PropTypes.node.isRequired,
  cb: PropTypes.func.isRequired
};

export default WrapForm;
