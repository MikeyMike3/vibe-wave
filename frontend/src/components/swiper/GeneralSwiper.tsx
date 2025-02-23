import { Swiper } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

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
      modules={[FreeMode]}
    >
      {children}
    </Swiper>
  );
};
