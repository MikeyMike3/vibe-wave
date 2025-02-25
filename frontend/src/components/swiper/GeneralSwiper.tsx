import { Swiper, SwiperRef } from 'swiper/react';

import 'swiper/css';
import { RefObject } from 'react';

type GeneralSwiperProps = {
  children: React.ReactNode;
  swiperRef: RefObject<SwiperRef>;
};

export const GeneralSwiper = ({ children, swiperRef }: GeneralSwiperProps) => {
  return (
    <Swiper
      ref={swiperRef}
      style={{ width: 'calc(100vw - 285px)' }}
      grabCursor={true}
      slidesPerView={'auto'}
      direction="horizontal"
    >
      {children}
    </Swiper>
  );
};
