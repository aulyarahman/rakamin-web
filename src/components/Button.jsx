import React from "react";
import { PropTypes } from "prop-types";

/**
 * @description Hello **world**!
 * @typedef {{
 *  children: React.ReactNode
 *  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
 * }}
 * Props
 *
 * @type React.FunctionComponent<Props>
 */

const Button = (props) => {
  const css =
    "text-white py-[4px] px-[16px] bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center rounded-sm";

  return (
    <button onClick={props.onClick} className={css}>
      {props.children}
    </button>
  );
};

export default Button;

export const Buttons = (props) => (
  <button
    type="button"
    className="text-primary text-sm hover:text-white border border-primary focus:ring-4 focus:outline-none font-medium rounded-[5px] text-center px-[8px] py-[2px]"
  >
    {props.children}
  </button>
);
