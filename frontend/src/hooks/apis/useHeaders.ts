import { useMemo } from 'react';
import { UseAuthContext } from '../context/useAuthContext';

export const useHeaders = () => {
  const { accessToken } = UseAuthContext();
  return useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }, [accessToken]);
};
