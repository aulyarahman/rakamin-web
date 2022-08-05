import React from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';
import { Colors } from '../utils/Colors.js';

const Card = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'w-[326px] pl-[16px] pr-[12px] py-4 space-y-3',
        'rounded-[4px]',
        'border-[1px] border-primary',
        className
      )}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Card;
