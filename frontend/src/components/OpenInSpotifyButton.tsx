type OpenInSpotifyButtonProps = {
  spotifyUrl: string | undefined;
};

export const OpenInSpotifyButton = ({ spotifyUrl }: OpenInSpotifyButtonProps) => {
  return (
    spotifyUrl && (
      <a target="_blank" href={spotifyUrl}>
        <button className="w-full text-left text-textPrimary duration-150 hover:text-aqua">
          Spotify
        </button>
      </a>
    )
  );
};
