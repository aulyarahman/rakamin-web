import React from 'react';
import Button from './Button';
import { IconAdd } from './Icon';
import { useSelector } from 'react-redux';
import useConfirmationModalManagement from '../hooks/useConfirmationModal.js';

const Navbar = () => {
  const { open } = useConfirmationModalManagement();

  return (
    <div className="shadow-md p-5 flex h-[64px] gap-3">
      <p className="font-bold text-[18px]">Product Roadmap</p>
      <Button onClick={() => open()}>
        <IconAdd />
        Add New Group
      </Button>
    </div>
  );
};

export default Navbar;
