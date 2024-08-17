import React from 'react';

type UserPlaylistProps = {
  name: string;
};

export const UserPlaylist = ({ name }: UserPlaylistProps) => {
  return <div>{name}</div>;
};
