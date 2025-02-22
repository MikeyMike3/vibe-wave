import React from 'react';

type GridContainerProps = {
  children: React.ReactNode;
};
//prettier-ignore
export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return (
    <div className="grid h-full w-full grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-3 pt-6">
      {children}
    </div>
  );
};
