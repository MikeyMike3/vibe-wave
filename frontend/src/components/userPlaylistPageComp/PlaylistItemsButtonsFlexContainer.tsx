type PlaylistItemsButtonsFlexContainerProps = {
  children: React.ReactNode;
};

export const PlaylistItemsButtonsFlexContainer = ({
  children,
}: PlaylistItemsButtonsFlexContainerProps) => {
  return <div className="flex gap-6">{children}</div>;
};
