import React from 'react';

type GridContainerProps = {
  children: React.ReactNode;
};
//prettier-ignore
export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return (
    <div className="grid h-full w-full flex-1 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-7 pt-6">
      {children}
    </div>
  );
};
