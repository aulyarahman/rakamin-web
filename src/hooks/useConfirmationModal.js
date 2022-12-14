import { useDispatch, useSelector } from 'react-redux';
import { confirmationModalActions, confirmationModalThunkActions } from '~/store/slices/modalSlice';

function useConfirmationModalManagement() {
  const dispatch = useDispatch();
  const { isOpened, type } = useSelector((state) => ({
    isOpened: state.modal.isOpened
  }));

  const open = async () => {
    const { payload } = await dispatch(confirmationModalThunkActions.open());
    return payload;
  };

  const confirm = async () => {
    return dispatch(confirmationModalActions.confirm());
  };

  const decline = () => {
    return dispatch(confirmationModalActions.decline());
  };

  return {
    isOpened,
    open,
    confirm,
    decline,
    type
  };
}

export default useConfirmationModalManagement;
