import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchHomePageData = () => {
  const apiHeaders = useHeaders();
  const fetchNewAlbumReleases = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/browse/new-releases', apiHeaders);
      if (!response.ok) {
        throw new Error('Error fetching new album releases');
      }
      const data: SpotifyApi.ListOfNewReleasesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching new album releases', error);
      throw error;
    }
  };

  const fetchUsersTopTracks = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks`, apiHeaders);
      if (!response.ok) {
        throw new Error('Error fetching users top tracks');
      }
      const data: SpotifyApi.UsersTopTracksResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users top tracks', error);
      throw error;
    }
  };

  const fetchUsersTopArtists = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/top/artists`, apiHeaders);
      if (!response.ok) {
        throw new Error('Error fetching users top artists');
      }
      const data: SpotifyApi.UsersTopArtistsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users top artists', error);
      throw error;
    }
  };

  const fetchHomePageDetails = async () => {
    const [newAlbumReleases, topTracks, topArtists] = await Promise.all([
      fetchNewAlbumReleases(),
      fetchUsersTopTracks(),
      fetchUsersTopArtists(),
    ]);

    return {
      newAlbumReleases,
      topTracks,
      topArtists,
    };
  };

  const {
    data: homePageData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['homePageData'],
    queryFn: fetchHomePageDetails,
  });

  return { homePageData, isLoading, isError };
};
