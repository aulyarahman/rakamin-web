import React from "react";

/**
 * @description Container
 * @typedef {{
 *  children: React.ReactNode
 * }}
 * Props
 *
 * @type React.FunctionComponent<Props>
 */

export const Container = (props) => {
  return <div className="p-[24px] flex">{props.children}</div>;
};
