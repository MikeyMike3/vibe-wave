// import spotifyImage from '../assets/imgs/Primary_Logo_White_CMYK.svg';

type OpenInSpotifyButtonProps = {
  spotifyUrl: string | undefined;
  isNotFullWidth?: boolean;
};

export const OpenInSpotifyButton = ({ spotifyUrl, isNotFullWidth }: OpenInSpotifyButtonProps) => {
  return (
    spotifyUrl && (
      <a target="_blank" href={spotifyUrl} className={`${isNotFullWidth && 'inline-flex w-fit'}`}>
        <button
          className={`${!isNotFullWidth ? 'w-full' : ''} text-left text-textPrimary duration-150 hover:text-aqua`}
        >
          <div className="flex items-center gap-2">
            <i className="fa-brands fa-spotify text-xl"></i>
            Open In Spotify
          </div>
        </button>
      </a>
    )
  );
};
