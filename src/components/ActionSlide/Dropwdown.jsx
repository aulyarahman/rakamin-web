import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';

const Dropdown = ({ list, label, onClick }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-full p-1 hover:bg-gray-500 hover:bg-opacity-30">
          {label}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute w-max origin-top-right divide-y divide-gray-100 rounded-sm bg-white shadow-lg z-100">
          {list.map((i, k) => (
            <div className="px-1 py-1  hover:bg-white" key={k}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onClick(k)}
                    className={`${
                      active && k === 3
                        ? 'text-red-600'
                        : active && k < 3
                        ? 'text-primary'
                        : 'text-gray-800'
                    } group flex w-full items-center rounded-md px-2 py-2 text-[14px] font-bold w-[320px] gap-5`}>
                    {i.icon}
                    {i.val}
                  </button>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.propTypes = {
  label: PropTypes.node,
  list: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func
};

export default Dropdown;
