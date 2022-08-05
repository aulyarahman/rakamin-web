import { useState } from 'react';
import PropTypes from 'prop-types';

const Modal = (props) => {
  const { children, setIsOpen, isOpen } = props;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto">
          <div className="fixed inset-0 bg-[#f1f5f9] opacity-20" />
          <div className={`fixed z-10 inset-0 overflow-y-auto animate-move-to-down `}>
            <div
              className={`flex items-end justify-center min-h-screen pt-4
          px-4 pb-20
          text-center sm:block sm:p-0 `}>
              <div
                className="fixed inset-0 transition-opacity "
                aria-hidden="true"
                onClick={() => setIsOpen(false)}>
                <div className="absolute inset-0 opacity-75"></div>
              </div>

              <div
                className={`inline-block align-bottom bg-white dark:bg-black-100 rounded-lg text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8
            sm:align-middle rounded-sm`}
                role="dialog">
                <div
                  className="bg-white dark:bg-black-100 dark:text-white rounded px-[24px] pt-6 pb-8 flex flex-col
              overflow-y-auto h-auto w-[420px] h-[311px]">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired
};

export default Modal;
