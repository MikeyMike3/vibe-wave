import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchArtistDetails = (artistId: string | undefined) => {
  const apiHeader = useHeaders();
  const fetchArtistInfo = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, apiHeader);

      if (!response.ok) {
        throw new Error('Error fetching artist info');
      }

      const data: SpotifyApi.ArtistObjectFull = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artist info', error);
      throw error;
    }
  };

  const fetchArtistAlbums = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        apiHeader,
      );

      if (!response.ok) {
        throw new Error('Error fetching artist albums');
      }

      const data: SpotifyApi.ArtistsAlbumsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artist albums', error);
      throw error;
    }
  };

  const fetchArtistTopTracks = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
        apiHeader,
      );

      if (!response.ok) {
        throw new Error('Error fetching artist top tracks');
      }

      const data: SpotifyApi.ArtistsTopTracksResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching artist top tracks', error);
      throw error;
    }
  };

  const fetchArtistDetails = async () => {
    const artistInfo = fetchArtistInfo();
    const artistAlbums = fetchArtistAlbums();
    const artistTopTracks = fetchArtistTopTracks();

    const [info, albums, topTracks] = await Promise.all([
      artistInfo,
      artistAlbums,
      artistTopTracks,
    ]);

    return {
      info,
      albums,
      topTracks,
    };
  };

  const {
    data: artistDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['artistDetails', artistId],
    queryFn: fetchArtistDetails,
  });
  return { artistDetails, isError, isLoading };
};
