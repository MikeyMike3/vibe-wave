import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchArtistImagesAndGenres = (
  playlistItems: SpotifyApi.PlaylistTrackObject[] | undefined,
) => {
  const apiHeader = useHeaders();

  const fetchArtistInfo = async (artistId: string) => {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, apiHeader);
    if (!response.ok) {
      throw new Error('Error fetching artist info');
    }
    const data: SpotifyApi.ArtistObjectFull = await response.json();
    return { images: data.images, genres: data.genres };
  };

  const fetchArtists = async () => {
    if (!playlistItems) return { artistData: {}, genres: [] };

    const artistIds = playlistItems
      .slice(0, 3)
      .map(item => item.track?.artists[0]?.id)
      .filter((artistId): artistId is string => !!artistId);

    const fetchedArtistData = await Promise.all(
      artistIds.map(async (artistId: string) => {
        const data = await fetchArtistInfo(artistId);
        return { [artistId]: data };
      }),
    );

    const artistData = fetchedArtistData.reduce<{
      [artistId: string]: { images: SpotifyApi.ImageObject[]; genres: string[] };
    }>((acc, artist) => ({ ...acc, ...artist }), {});

    const genres = fetchedArtistData.reduce<string[]>((acc, artist) => {
      const artistGenres = Object.values(artist)[0].genres;
      return [...acc, ...artistGenres];
    }, []);

    return { artistData, genres };
  };

  return useQuery({
    queryKey: ['artistImagesGenres', playlistItems],
    queryFn: fetchArtists,
    enabled: !!playlistItems,
  });
};
