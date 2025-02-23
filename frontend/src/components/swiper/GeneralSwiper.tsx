import { Swiper } from 'swiper/react';

import 'swiper/css';

type GeneralSwiperProps = {
  children: React.ReactNode;
};

export const GeneralSwiper = ({ children }: GeneralSwiperProps) => {
  return (
    <Swiper
      style={{ width: 'calc(100vw - 285px)' }}
      grabCursor={true}
      slidesPerView={'auto'}
      direction="horizontal"
    >
      {children}
    </Swiper>
  );
};
