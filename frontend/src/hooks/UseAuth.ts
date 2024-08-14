import { useEffect, useState } from 'react';
import axios from 'axios';

export const UseAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [expiresIn, setExpiresIn] = useState<number | undefined>(
    parseInt(sessionStorage.getItem('expiresIn') || '0') || undefined,
  );

  console.log(`code ${code}`);
  console.log(`accessToken ${accessToken}`);

  useEffect(() => {
    axios
      .post('http://localhost:3000/login', {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken);
        sessionStorage.setItem('accessToken', res.data.accessToken);

        setRefreshToken(res.data.refreshToken);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);

        setExpiresIn(res.data.expiresIn);
        sessionStorage.setItem('expiresIn', res.data.expiresIn.toString());

        window.location.href = '/party-mode';
      })
      .catch(() => {
        // window.location.href = '/';
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(
      () => {
        axios
          .post('http://localhost:3000/refresh', {
            refreshToken,
          })
          .then(res => {
            setAccessToken(res.data.accessToken);
            sessionStorage.setItem('accessToken', res.data.accessToken);

            setExpiresIn(res.data.expiresIn);
            sessionStorage.setItem('expiresIn', res.data.expiresIn.toString());
          })
          .catch(() => {
            window.location.href = '/';
          });
      },
      (expiresIn - 60) * 1000,
    );

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
};
