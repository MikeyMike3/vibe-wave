type PlaylistItemsGridProps = {
  children: React.ReactNode;
};

export const PlaylistItemsGrid = ({ children }: PlaylistItemsGridProps) => {
  return <div className="grid grid-cols-[1fr_300px] gap-5 text-white">{children}</div>;
};
