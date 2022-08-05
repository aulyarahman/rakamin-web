import { Buttons } from '../components/Button';
import React from 'react';
import { PropTypes } from 'prop-types';

const WrapForm = ({ children, cb }) => {
  return (
    <form onSubmit={cb}>
      {children}
      <div className={'flex'}>
        <Buttons variant={'outline'}>Cancel</Buttons>
        <Buttons type={'submit'}>Save Task</Buttons>
      </div>
    </form>
  );
};

WrapForm.PropTypes = {
  children: PropTypes.node.isRequired,
  cb: PropTypes.func.isRequired
};

export default WrapForm;
