import axios from 'axios';
import { useState, useEffect } from 'react';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    accept: 'text/html; charset=utf-8',
  },
  params: {
    period: '',
  },
};

interface ReturnType {
  data: null;
  loading: boolean;
  error: unknown;
  fetchData: () => void;
}

function useAxios(url: string, period = ''): ReturnType {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      axiosConfig.params.period = period;
      const res = await axios.get(url, axiosConfig);
      if (res.status === 200) {
        setData(res.data);
      } else throw new Error();
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    fetchData();
    return () => setLoading(false); // Cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, fetchData };
}

export default useAxios;
