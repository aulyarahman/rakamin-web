import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonClose, Buttons } from '../Button';
import useConfirmationModalManagement from '../../hooks/useConfirmationModal.js';
import { IconWarning } from '../Icon';
import useConfirmationToastManagement from '../../hooks/useToastConfirm.js';

export const ModalContent = ({ children, title = 'Create', isOpened, type }) => {
  const navigate = useNavigate();
  const { isOpened: isOpenToast, status } = useConfirmationToastManagement();
  const handleClose = () => navigate('/', { replace: true });
  const open = type === 'page' ? true : isOpened;

  useEffect(() => {
    if (isOpenToast && status !== 'pending') {
      handleClose();
    }
  }, [status]);

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-[420px] h-full transform overflow-hidden rounded-lg bg-white p-5 text-left align-middle shadow-xl transition-all ">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <Dialog.Title as="h3" className="text-lg font-bold leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                    </div>
                    <ButtonClose onClick={handleClose} />
                  </div>
                  <div className="mt-4">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const ModalConfirmation = () => {
  const { isOpened, confirm, decline } = useConfirmationModalManagement();

  return (
    <ModalContent
      isOpened={isOpened}
      title={
        <div className={'flex place-items-center space-x-2'}>
          <IconWarning />
          <p>Delete Task</p>
        </div>
      }>
      <div className={'space-y-5'}>
        <p>Are you sure want to delete this task? your action can’t be reverted.</p>
        <div className={'flex justify-between'}>
          <div />
          <div className={'gap-2 flex'}>
            <Buttons variant={'outline'} onClick={decline}>
              Cancel
            </Buttons>
            <Buttons className={'bg-red-500'} onClick={confirm}>
              Delete
            </Buttons>
          </div>
        </div>
      </div>
    </ModalContent>
  );
};
