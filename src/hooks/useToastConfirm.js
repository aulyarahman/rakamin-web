import { useDispatch, useSelector } from 'react-redux';
import { confirmationToastActions, toastThunkActions } from '../store/slices/toastSlice';

function useConfirmationToastManagement() {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state) => ({
    isOpened: state.toast.isOpened
  }));

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

  const status = (it) => {
    return dispatch(confirmationToastActions.setStatus({ status: it }));
  };

  return {
    isOpened,
    open,
    confirm,
    failed,
    status
  };
}

export default useConfirmationToastManagement;
