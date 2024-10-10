import { Link } from "react-router-dom";
import { formatTime } from "../../functions/formatTime";
import { PlaylistItemKebabMenu } from "../kebabMenu/PlaylistItemKebabMenu";
import { TrackInfo } from "../TrackInfo";

type PlaylistItemsTableProps = {
    playlistItems: SpotifyApi.PlaylistTrackResponse | undefined
}


export const PlaylistItemsTable = ({playlistItems}: PlaylistItemsTableProps) => {
  return (
    <table className="w-full table-auto text-textAccent">
              <thead className="border-b-2 border-textAccent">
                <tr className="p-2 text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Album</th>
                  <th className="p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                {playlistItems?.items.map((item, index) => {
                  return (
                    <tr key={item.track?.id} className="group">
                      <td className="p-2 group-hover:text-textPrimary">{index + 1}</td>
                      <td className="p-2">
                        <TrackInfo
                          images={item.track?.album.images}
                          name={item.track?.name}
                          artists={item.track?.artists}
                        />
                      </td>
                      <td className="p-2 group-hover:text-textPrimary">
                        <Link
                          className="hover:text-textPrimary hover:underline"
                          to={`/album/${item.track?.album.id}`}
                        >
                          {item.track?.album.name}
                        </Link>
                      </td>
                      <td className="p-2 group-hover:text-textPrimary">
                        {formatTime(item.track?.duration_ms)}
                      </td>

                      <td className="opacity-0 group-hover:opacity-100">
                        <PlaylistItemKebabMenu track={item} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
  )
}
