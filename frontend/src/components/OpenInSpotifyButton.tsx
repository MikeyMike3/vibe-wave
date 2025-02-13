import spotifyImage from '../assets/imgs/Primary_Logo_White_CMYK.svg';

type OpenInSpotifyButtonProps = {
  spotifyUrl: string | undefined;
};

export const OpenInSpotifyButton = ({ spotifyUrl }: OpenInSpotifyButtonProps) => {
  return (
    spotifyUrl && (
      <a target="_blank" href={spotifyUrl}>
        <button className="w-full text-left text-textPrimary duration-150 hover:text-aqua">
          <div className="justify-left flex gap-2">
            <img src={spotifyImage} className="w-6" />
            Open In Spotify
          </div>
        </button>
      </a>
    )
  );
};
