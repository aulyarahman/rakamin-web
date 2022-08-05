import { IconCheck, IconFiMore, IconLeft, IconPencil, IconRight, IconTrash } from './Icon';
import React from 'react';
import { PropTypes } from 'prop-types';
import clsx from 'clsx';
import Dropdown from './ActionSlide/Dropwdown';

const ListDropwDown = [
  {
    val: 'Move Right',
    icon: <IconRight />
  },
  {
    val: 'Move Right',
    icon: <IconLeft />
  },
  {
    val: 'Edit',
    icon: <IconPencil />
  },
  {
    val: 'Delete',
    icon: <IconTrash />
  }
];

export const ProgressBar = ({ progress, onClick }) => {
  return (
    <div className="flex gap-5 place-items-center">
      <div className={'flex w-full gap-2'}>
        <div className="w-full bg-gray-200 rounded-full h-[16px]">
          <div
            style={{ width: progress + '%' }}
            className={clsx(
              `${progress < 100 ? 'bg-primary' : 'bg-success'}`,
              'h-[16px] rounded-full'
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
      <Dropdown label={<IconFiMore />} list={ListDropwDown} onClick={(k) => onClick(k)} />
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  onClick: PropTypes.func
};
