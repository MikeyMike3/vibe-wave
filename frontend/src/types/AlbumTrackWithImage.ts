export type AlbumTrackWithImage = SpotifyApi.TrackObjectSimplified & {
  images: Spotify.Image[];
  albumId: string | undefined;
};
