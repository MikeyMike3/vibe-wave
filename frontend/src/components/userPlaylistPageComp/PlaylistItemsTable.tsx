type PlaylistItemsTableProps = {
  children: React.ReactNode;
  shouldIncludeAlbum?: boolean | undefined;
};

export const PlaylistItemsTable = ({ children, shouldIncludeAlbum }: PlaylistItemsTableProps) => {
  return (
    <table className="w-full table-auto text-textAccent">
      <thead className="border-b-2 border-textAccent">
        <tr className="p-2 text-left">
          <th className="p-2">#</th>
          <th className="p-2">Title</th>
          {shouldIncludeAlbum && <th className="p-2">Album</th>}

          <th className="p-2 text-left">Duration</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
