import { IconCheck, IconFiMore, IconLeft, IconPencil, IconRight, IconTrash } from './Icon';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import clsx from 'clsx';
import Dropdown from './ActionSlide/Dropwdown';
import { useSelector } from 'react-redux';

const ListDropwDown = [
  {
    id: 1,
    val: 'Move Right',
    icon: <IconRight />
  },
  {
    id: 2,
    val: 'Move Left',
    icon: <IconLeft />
  },
  {
    id: 3,
    val: 'Edit',
    icon: <IconPencil />
  },
  {
    id: 4,
    val: 'Delete',
    icon: <IconTrash />
  }
];

export const ProgressBar = ({ progress, onClick, todoIdx }) => {
  const [list, setList] = useState(ListDropwDown);
  const { data } = useSelector((i) => i.todos);

  const chekcLastItem = () => {
    if (data[data.length - 1].idx === todoIdx) {
      return list.filter((i) => i.id !== 1);
    }
    if (data[0].idx === todoIdx) {
      return list.filter((i) => i.id !== 2);
    }
    return list;
  };

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
      <Dropdown label={<IconFiMore />} list={chekcLastItem()} onClick={(k) => onClick(k)} />
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  onClick: PropTypes.func
};
