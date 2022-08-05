import React from 'react';
import Button from './Button';
import { IconAdd } from './Icon';
import { PropTypes } from 'prop-types';

const Navbar = ({ btnClick, labelButton = 'Add New Group' }) => {
  return (
    <div className="shadow-md p-5 flex h-[64px] gap-3">
      <p className="font-bold text-[18px]">Product Roadmap</p>
      <Button onClick={btnClick}>
        <IconAdd />
        {labelButton}
      </Button>
    </div>
  );
};

Navbar.PropTypes = {
  btnClick: PropTypes.func,
  labelButton: PropTypes.string
};

export default Navbar;
