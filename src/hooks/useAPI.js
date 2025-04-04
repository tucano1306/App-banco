// src/hooks/useAPI.js
import { useState, useCallback } from 'react';

// YA NO definimos servicios aquí, solo el hook
const useAPI = (apiFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction(...args);
        setData(response.data || response); // Manejar ambos formatos posibles
        return response.data || response;
      } catch (err) {
        setError(err.response?.data?.message || 'Ocurrió un error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );
  
  return { data, loading, error, execute };
};

export default useAPI;