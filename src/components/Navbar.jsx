import React from 'react';
import { Button } from './Button';
import { IconAdd } from './Icon';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ labelButton = 'Add New Group' }) => {
  return (
    <div className="shadow-md p-5 flex h-[64px] gap-3">
      <p className="font-bold text-[18px]">Product Roadmap</p>
      {/*<Link to={'/todos/add'}>*/}
      {/*  <Button>*/}
      {/*    <IconAdd />*/}
      {/*    {labelButton}*/}
      {/*  </Button>*/}
      {/*</Link>*/}
    </div>
  );
};

Navbar.propTypes = {
  labelButton: PropTypes.string
};

export default Navbar;
