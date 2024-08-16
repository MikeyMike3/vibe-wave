export const headers = (accessToken: string | null) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
