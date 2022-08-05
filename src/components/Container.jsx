import React from 'react';
import { PropTypes } from 'prop-types';

export const Containers = ({ children }) => {
  return (
    <div className="p-[24px]">
      <div className={'grid lg:grid-cols-4 gap-5'}>{children}</div>
    </div>
  );
};

Containers.propTypes = {
  children: PropTypes.node.isRequired
};
