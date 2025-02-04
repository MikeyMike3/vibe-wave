import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchUniqueArtists = (
  tracks: SpotifyApi.SavedTrackObject[] | SpotifyApi.PlaylistTrackObject[] | undefined,
) => {
  const apiHeader = useHeaders();

  const fetchUniqueArtists = async (): Promise<SpotifyApi.ArtistObjectFull[]> => {
    if (!tracks || tracks.length === 0) return [];

    const artistSet = new Set<string>();
    const artistIds: string[] = [];

    for (const track of tracks) {
      if (track.track)
        for (const artist of track.track.artists) {
          if (!artistSet.has(artist.id)) {
            artistSet.add(artist.id);
            artistIds.push(artist.id);
          }
          if (artistIds.length === 3) {
            break;
          }
        }
      if (artistIds.length === 3) {
        break;
      }
    }

    if (artistIds.length === 0) return [];

    const url = `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`;

    try {
      const response = await fetch(url, apiHeader);
      if (!response.ok) {
        throw new Error('Error fetching unique artists');
      }
      const data: SpotifyApi.MultipleArtistsResponse = await response.json();
      return data.artists;
    } catch (error) {
      console.error('Error when fetching unique artists', error);
      throw error;
    }
  };

  const {
    data: uniqueArtists = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['uniqueArtist', tracks],
    queryFn: fetchUniqueArtists,
    enabled: !!tracks?.length,
  });

  return { uniqueArtists, isError, isLoading };
};
