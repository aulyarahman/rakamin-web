import { useDispatch, useSelector } from 'react-redux';
import { confirmationToastActions, toastThunkActions } from '../store/slices/toastSlice';

function useConfirmationToastManagement() {
  const dispatch = useDispatch();
  const { isOpened, message, status } = useSelector((state) => state.toast);

  const open = async () => {
    const { payload } = await dispatch(toastThunkActions.open());
    return payload;
  };

  const confirm = async () => {
    return dispatch(confirmationToastActions.success());
  };

  const failed = () => {
    return dispatch(confirmationToastActions.failed());
  };

  const setStatus = (status, message, isOpened) => {
    return dispatch(confirmationToastActions.setStatus({ status, message, isOpened }));
  };

  return {
    isOpened,
    open,
    confirm,
    failed,
    setStatus,
    message,
    status
  };
}

export default useConfirmationToastManagement;
