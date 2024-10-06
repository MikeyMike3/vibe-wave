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
      const data = await response.json();
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

  const fetchFeaturedPlaylists = async () => {
    try {
      const response = await fetch(
        'https://api.spotify.com/v1/browse/featured-playlists',
        apiHeaders,
      );
      if (!response.ok) {
        throw new Error('Error fetching featured playlists');
      }
      const data: SpotifyApi.ListOfFeaturedPlaylistsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetch featured playlists', error);
      throw error;
    }
  };

  const fetchTrackRecommendations = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/recommendations', apiHeaders);
      if (!response.ok) {
        throw new Error('Error fetching recommended tracks');
      }
      const data: SpotifyApi.RecommendationsFromSeedsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recommended tracks', error);
      throw error;
    }
  };

  const fetchHomePageDetails = async () => {
    const [newAlbumReleases, topTracks, topArtists, featuredPlaylists, trackRecommendations] =
      await Promise.all([
        fetchNewAlbumReleases(),
        fetchUsersTopTracks(),
        fetchUsersTopArtists(),
        fetchFeaturedPlaylists(),
        fetchTrackRecommendations(),
      ]);

    return {
      newAlbumReleases,
      topTracks,
      topArtists,
      featuredPlaylists,
      trackRecommendations,
    };
  };

  const {
    data: homePageDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['homePageData'],
    queryFn: fetchHomePageDetails,
  });

  return { homePageDetails, isLoading, isError };
};
