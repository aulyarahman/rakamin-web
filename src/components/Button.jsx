import React from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';

const Button = (props) => {
  const css =
    'text-white py-[4px] px-[16px] bg-primary h-[28px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center rounded-sm';

  return (
    <button onClick={props.onClick} className={css}>
      {props.children}
    </button>
  );
};

export default Button;

export const Buttons = ({ type = 'button', children }) => (
  <button
    type={type}
    className={clsx(
      'text-primary text-sm hover:text-white border border-primary focus:ring-4 focus:outline-none',
      'font-medium rounded-[5px] text-center px-[8px] py-[2px]'
    )}>
    {children}
  </button>
);

Button.PropTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string
};
