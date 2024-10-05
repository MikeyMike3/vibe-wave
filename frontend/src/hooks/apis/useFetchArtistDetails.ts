import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchArtistDetails = (artistId: string | undefined) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeader = useHeaders(accessToken);
  const fetchArtistInfo = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, apiHeader);

      if (!response.ok) {
        throw new Error('Error fetching artist details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
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
        throw new Error('Error fetching artist details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
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
        throw new Error('Error fetching artist details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchArtistRelatedArtists = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
        apiHeader,
      );

      if (!response.ok) {
        throw new Error('Error fetching artist details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const fetchArtistDetails = async () => {
    const artistInfo = fetchArtistInfo();
    const artistAlbums = fetchArtistAlbums();
    const artistTopTracks = fetchArtistTopTracks();
    const artistRelatedArtists = fetchArtistRelatedArtists();

    const [info, albums, topTracks, relatedArtists] = await Promise.all([
      artistInfo,
      artistAlbums,
      artistTopTracks,
      artistRelatedArtists,
    ]);

    return {
      info,
      albums,
      topTracks,
      relatedArtists,
    };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['artistDetails', artistId],
    queryFn: fetchArtistDetails,
    enabled: !!accessToken,
  });
  return { data, isError, isLoading };
};
