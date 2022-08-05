import { IconCheck, IconFiMore } from './Icon';
import React from 'react';
import { PropTypes } from 'prop-types';
import clsx from 'clsx';

const ProgressBar = ({ progress, onClick }) => {
  return (
    <div className="flex gap-5 place-items-center">
      <div className={'flex w-full gap-2'}>
        <div className="w-full bg-gray-200 rounded-full h-[16px]">
          <div
            className={clsx(
              `${progress < 100 ? 'bg-primary' : 'bg-success'}`,
              'h-[16px] rounded-full',
              `w-[${progress}%]`
            )}></div>
        </div>
        {progress < 100 ? (
          <p>{progress}%</p>
        ) : (
          <div
            className={`bg-success flex w-[16px] h-[16px] items-center justify-center rounded-full`}>
            <IconCheck />
          </div>
        )}
      </div>
      <button onClick={onClick}>
        <IconFiMore />
      </button>
    </div>
  );
};

ProgressBar.PropTypes = {
  progress: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ProgressBar;
