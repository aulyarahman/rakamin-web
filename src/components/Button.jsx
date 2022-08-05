import React from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';
import { IconLoading } from './Icon';

export const Button = (props) => {
  const css =
    'text-white py-[4px] px-[16px] bg-primary h-[28px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center rounded-sm';

  return (
    <button onClick={props.onClick} className={css}>
      {props.children}
    </button>
  );
};

export const Buttons = ({
  type = 'button',
  children,
  className,
  onClick,
  variant = 'filled',
  isLoading = false
}) => (
  <button
    type={type}
    onClick={onClick}
    className={clsx(
      'inline-flex text-[14px] hover:bg-gray-200 border-[1.5px] focus:ring-4 focus:outline-none',
      'font-medium rounded-[8px] text-center px-[8px] py-[2px]',
      'min-w-[97px] h-[32px] place-items-center',
      `${
        variant === 'filled'
          ? 'text-white bg-primary hover:text-black border-none'
          : 'text-black border-neutral-40'
      }`,
      className
    )}>
    {isLoading && <IconLoading />}
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string
};

export const ButtonClose = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
    data-dismiss-target="#toast-success"
    aria-label="Close">
    <span className="sr-only">Close</span>
    <svg
      aria-hidden="true"
      className="w-5 h-5 text-black"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"></path>
    </svg>
  </button>
);
