type PlaylistItemsTableProps = {
  children: React.ReactNode;
  shouldIncludeAlbum?: boolean | undefined;
};

export const PlaylistItemsTable = ({ children, shouldIncludeAlbum }: PlaylistItemsTableProps) => {
  return (
    <table className="w-full table-auto text-textAccent">
      <thead className="border-b-2 border-textAccent">
        <tr className="p-2 text-left">
          <th className="w-4 min-w-[50px] p-2">#</th>
          <th className={`${shouldIncludeAlbum ? 'w-full p-2 xl:w-1/2' : 'w-full p-2'}`}>Title</th>
          {shouldIncludeAlbum && <th className="hidden w-full p-2 xl:block">Album</th>}

          <th className="w-[3%] p-2">Duration</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
