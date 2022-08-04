import React from 'react';

export const Containers = (props) => {
  return <div className="p-[24px] grid grid-cols-4 gap-4 gap-4">{props.children}</div>;
};
