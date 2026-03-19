import { useState, useCallback } from 'react';

/**
 * Custom hook to manage simulation parameters
 * @param {Object} initialParams - The initial state of parameters
 * @returns {Object} - The current parameters, a setter, and a reset function
 */
export const useSimulationState = (initialParams) => {
  const [params, setParams] = useState(initialParams);

  const updateParam = useCallback((key, value) => {
    setParams((prev) => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetParams = useCallback(() => {
    setParams(initialParams);
  }, [initialParams]);

  return {
    params,
    updateParam,
    resetParams,
    setParams
  };
};
