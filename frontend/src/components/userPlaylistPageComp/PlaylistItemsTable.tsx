type PlaylistItemsTableProps = {
  children: React.ReactNode;
  shouldIncludeAlbum?: boolean | undefined;
};

export const PlaylistItemsTable = ({ children, shouldIncludeAlbum }: PlaylistItemsTableProps) => {
  return (
    <table className="w-full table-auto text-textAccent">
      <thead className="border-b-2 border-textAccent">
        <tr className="p-2 text-left">
          <th className="min-w-[50px] p-2">#</th>
          <th className={`${shouldIncludeAlbum ? 'w-1/2 p-2' : 'w-full p-2'}`}>Title</th>
          {shouldIncludeAlbum && <th className="w-full p-2">Album</th>}

          <th className="w-[3%] p-2">Duration</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
