import React from 'react';

type GridContainerProps = {
  children: React.ReactNode;
};
//prettier-ignore
const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-7">
      {children}
    </div>
  );
};

export default GridContainer;
