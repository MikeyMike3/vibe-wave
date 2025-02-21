type PlaylistTableColumnFlexContainerProps = {
  children: React.ReactNode;
};

export const PlaylistTableColumnFlexContainer = ({
  children,
}: PlaylistTableColumnFlexContainerProps) => {
  return <div className="flex flex-col gap-5">{children}</div>;
};
