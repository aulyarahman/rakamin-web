import React from "react";
import { PropTypes } from "prop-types";

const Card = (props) => {
  const styledCard =
    "w-[326px] rounded-[4px] bg-[#F7FEFF] border-[1px] border-primary rounded-sm pl-[16px] pr-[12px] py-4 space-y-3";

  return <div className={`${styledCard}`}>{props.children}</div>;
};

Card.PropTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
