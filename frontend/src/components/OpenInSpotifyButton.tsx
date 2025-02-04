type OpenInSpotifyButtonProps = {
  spotifyUrl: string | undefined;
};

export const OpenInSpotifyButton = ({ spotifyUrl }: OpenInSpotifyButtonProps) => {
  return (
    spotifyUrl && (
      <a target="_blank" href={spotifyUrl}>
        Spotify
      </a>
    )
  );
};
