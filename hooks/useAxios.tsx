import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    accept: 'text/html; charset=utf-8',
  },
};

interface ReturnType<S> {
  data: S | null;
  loading: boolean;
  error: unknown;
  fetchData: () => void;
}

function useAxios<S>(url: string): ReturnType<S> {
  const [data, setData] = useState<S | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(url, axiosConfig);
      if (res.status === 200) {
        setLoading(false);
        setData(res.data);
      } else throw new Error();
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => setLoading(false);
  }, [fetchData]);

  return { data, loading, error, fetchData };
}

export default useAxios;
