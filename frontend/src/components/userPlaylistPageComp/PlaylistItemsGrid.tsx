type PlaylistItemsGridProps = {
  children: React.ReactNode;
};

export const PlaylistItemsGrid = ({ children }: PlaylistItemsGridProps) => {
  return (
    <div className="gap-5 text-white md:grid md:grid-cols-[1fr_200px] lg:grid-cols-[1fr_300px]">
      {children}
    </div>
  );
};
