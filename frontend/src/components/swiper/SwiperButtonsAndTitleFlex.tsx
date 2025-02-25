import React from 'react';

type SwiperButtonsAndTitleFlexProps = {
  children: React.ReactNode;
};

export const SwiperButtonsAndTitleFlex = ({ children }: SwiperButtonsAndTitleFlexProps) => {
  return <div className="flex items-center justify-between">{children}</div>;
};
