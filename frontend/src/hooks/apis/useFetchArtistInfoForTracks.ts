import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchArtistInfoForTracks = (
  playlistItems: SpotifyApi.PlaylistTrackObject[] | undefined,
) => {
  const apiHeader = useHeaders();

  const fetchArtistInfo = async (artistId: string | undefined) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, apiHeader);
    if (!response.ok) {
      throw new Error('Error fetching artist info');
    }
    const data: SpotifyApi.ArtistObjectFull = await response.json();
    return data;
  };

  const fetchArtists = async () => {
    if (!playlistItems) return {};

    const artistIds = playlistItems.slice(0, 3).map(item => item.track?.artists[0]?.id);

    if (artistIds) {
      const fetchedArtistData = await Promise.all(
        artistIds
          .filter((artistId): artistId is string => !!artistId)
          .map(async artistId => {
            const data = await fetchArtistInfo(artistId);
            return { [artistId]: data };
          }),
      );

      const combinedArtistInfo = fetchedArtistData.reduce((acc, artistData) => {
        return { ...acc, ...artistData };
      }, {});

      return combinedArtistInfo;
    }
  };

  const {
    data: artistInfo,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['artistInfo', playlistItems],
    queryFn: fetchArtists,
    enabled: !!playlistItems,
  });

  return { artistInfo, error, isLoading };
};
