import React from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';

export const Card = ({ children, className, style }) => {
  return (
    <div
      style={style}
      className={clsx(
        'pl-[16px] pr-[12px] py-4 space-y-3',
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
  className: PropTypes.string,
  style: PropTypes.css
};
