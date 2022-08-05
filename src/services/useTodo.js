import { Axios } from '../config/axios.config';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmationToastActions } from '../store/slices/toastSlice.js';
import useConfirmationToastManagement from '../hooks/useToastConfirm.js';
import useConfirmationModalManagement from '../hooks/useConfirmationModal.js';

export const useTodo = (url) => {
  const { setStatus } = useConfirmationToastManagement();
  const { open } = useConfirmationModalManagement();
  const [refetch, setRefetch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const create = async (data) => {
    try {
      setIsLoading(true);
      setStatus('pending', 'Loading..', true);
      await Axios.post(url, data);
      setStatus('success', `Success Create Items`, true);
      setRefetch(!refetch);
    } catch (error) {
      setStatus('error', error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setIsLoading(true);
      setStatus('pending', 'Loading..', true);
      await Axios.patch(url, data);
      setStatus('success', `Success Update Items`, true);
      setRefetch(!refetch);
    } catch (error) {
      setStatus('error', error.response.data);
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodos = async (params) => {
    const isConfirm = await open();
    if (isConfirm) {
      try {
        setIsLoading(true);
        setStatus('pending', 'Loading..', true);
        await Axios.delete(params);
        setStatus('success', `Success Delete Items`, true);
        setRefetch(!refetch);
      } catch (error) {
        setStatus('error', error.response.data);
        setError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const fetch = async () => {
    try {
      setLoading(true);
      const resTodo = await Axios.get(url);
      setData(resTodo.data);
      return resTodo;
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetch();
    })();
  }, [url, refetch]);

  return {
    data,
    loading,
    error,
    create,
    isLoading,
    deleteTodos,
    update
  };
};
