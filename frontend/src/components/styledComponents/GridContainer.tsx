import React from 'react';

type GridContainerProps = {
  children: React.ReactNode;
};
//prettier-ignore
export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return (
    <div className="grid h-full w-full grid-cols-[repeat(auto-fill,_minmax(min(175px,_100%),_1fr))], 1fr))] xl:grid-cols-[repeat(auto-fill,_minmax(min(200px,_100%),_1fr))]
 gap-3 pt-6">
      {children}
    </div>
  );
};
