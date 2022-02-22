import axios from 'axios';
import { useState, useEffect } from 'react';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    accept: 'text/html; charset=utf-8',
  },
};

interface ReturnType {
  data: null;
  loading: boolean;
  error: unknown;
}

function useAxios(url: string): ReturnType {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
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

  return { data, loading, error };
}

export default useAxios;
