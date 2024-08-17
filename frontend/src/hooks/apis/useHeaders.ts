import { useMemo } from 'react';

export const useHeaders = (accessToken: string | null) => {
  return useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }, [accessToken]);
};
