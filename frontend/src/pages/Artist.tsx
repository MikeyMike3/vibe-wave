import { useParams } from 'react-router-dom';
import { useFetchArtistDetails } from '../hooks/apis/useFetchArtistDetails';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useEffect, useState } from 'react';
import { getImageUrl } from '../functions/getImageUrl';
import { capitalizeFirstLetterOfEachWord } from '../functions/capitalizeFirstLetterOfEachWord';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { useGetBackgroundImageColor } from '../hooks/useGetBackgroundImageColor';
import { modifyDynamicBgColor } from '../functions/modifyDynamicBgColor';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { ArtistTracksTR } from '../components/artistPageComponents/ArtistTracksTR';
import { OpenInSpotifyButton } from '../components/OpenInSpotifyButton';

export const Artist = () => {
  const { artistId } = useParams();
  const { artistDetails, isLoading, isError } = useFetchArtistDetails(artistId);
  const getBackgroundImageColor = useGetBackgroundImageColor();
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const image = getImageUrl(artistDetails?.info.images);

  useEffect(() => {
    if (image) {
      (async () => {
        const color = await getBackgroundImageColor(image);
        setBackgroundColor(modifyDynamicBgColor(color, 0.6, 1));
      })();
    }
  }, [image, getBackgroundImageColor, setBackgroundColor]);

  const formatNumber = (value: number | undefined): string | undefined => {
    if (!value) {
      return undefined;
    }
    const string = value.toString();
    const array = string.split('');

    for (let i = array.length - 3; i > 0; i -= 3) {
      array.splice(i, 0, ',');
    }
    return array.join('');
  };

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div
      className="h-full"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 10%, ${backgroundColor} 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Wrapper>
        <div className="flex gap-5 text-white">
          <img
            className="h-96 w-96 rounded-lg object-cover"
            src={image}
            alt={`${artistDetails?.info.name}`}
          />
          <div className="mt-auto flex flex-col gap-2">
            <h1 className="text-3xl">{artistDetails?.info.name}</h1>
            <p>{formatNumber(artistDetails?.info.followers.total)} followers</p>
            {artistDetails?.info.genres.length !== 0 && (
              <div className="flex gap-4">
                {artistDetails?.info.genres.map(item => (
                  <p
                    key={item}
                    className="rounded-3xl border-2 border-textPrimary px-4 py-2 text-textPrimary"
                  >
                    {capitalizeFirstLetterOfEachWord(item)}
                  </p>
                ))}
              </div>
            )}

            <OpenInSpotifyButton spotifyUrl={artistDetails?.info.external_urls.spotify} />
          </div>
        </div>
        <div className="mt-3">
          <h2 className="mb-2 text-xl text-white">Popular Tracks:</h2>
          <PlaylistItemsTable shouldIncludeAlbum={true}>
            {artistDetails?.topTracks.tracks
              .sort((a, b) => {
                return b.popularity - a.popularity;
              })
              .map((item, index) => (
                <ArtistTracksTR
                  key={item.id || index} // Ensure a unique key
                  position={index + 1}
                  images={item.album.images}
                  trackName={item.name}
                  artists={item.artists}
                  trackLength={item.duration_ms}
                  track={item}
                  trackId={item.id}
                  album={item.album}
                />
              ))}
          </PlaylistItemsTable>
        </div>
        <div className="mt-3 gap-7 overflow-x-auto pb-4" style={{ width: 'calc(100vw - 360px)' }}>
          {artistDetails && artistDetails?.albums.items.length > 0 && (
            <>
              <h2 className="mb-2 text-xl text-white">Albums: </h2>
              <div className="flex">
                {artistDetails?.albums.items.map(item => (
                  <SearchResultAlbumItem key={item.id} album={item} />
                ))}
              </div>
            </>
          )}
        </div>
      </Wrapper>
    </div>
  );
};
