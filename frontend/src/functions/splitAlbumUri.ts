// this is used to get the album id. Sometimes the album id is not provided but the album uri is provided.
// the album id is within the uri so this is extracting the id from the uri.
export const splitAlbumUri = (uri: string | undefined) => {
  const uriSplit = uri?.split(':');
  if (uriSplit) {
    return uriSplit[2];
  }
};
