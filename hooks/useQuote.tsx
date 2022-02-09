import axios from 'axios';
import { useState, useCallback } from 'react';

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    accept: 'text/html; charset=utf-8',
  },
};

function useQuote(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      setData(null);
      setError(null);

      const res = await axios.get(url, axiosConfig);
      if (res.status === 200) {
        setLoading(false);
        setData(res.data);
      } else throw new Error();
    } catch (e) {
      console.error(e);
    }
  }, [url]);

  return { fetchQuote, data, loading, error };
}

export default useQuote;
