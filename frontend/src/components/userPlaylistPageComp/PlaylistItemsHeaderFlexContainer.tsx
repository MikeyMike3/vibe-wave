type PlaylistItemsHeaderFlexContainerProps = {
  children: React.ReactNode;
};

export const PlaylistItemsHeaderFlexContainer = ({
  children,
}: PlaylistItemsHeaderFlexContainerProps) => {
  return <div className="flex flex-col gap-5">{children} </div>;
};
