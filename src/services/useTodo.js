import axios from 'axios';
import { Axios } from '../config/axios.config.js';
import { useEffect, useState } from 'react';

export const useTodo = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const resTodo = await Axios.get(url);
      setData(resTodo.data);
      return resTodo;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await fetch().finally(() => setLoading(false));
    })();
  }, [url]);

  return {
    data,
    loading
  };
};
