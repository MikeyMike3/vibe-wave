import { Swiper, SwiperRef } from 'swiper/react';

import 'swiper/css';
import { RefObject, useEffect, useState } from 'react';

type GeneralSwiperProps = {
  children: React.ReactNode;
  swiperRef?: RefObject<SwiperRef>;
};

export const GeneralSwiper = ({ children, swiperRef }: GeneralSwiperProps) => {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' && window.innerWidth < 1024
      ? 'calc(100vw - 45px)'
      : 'calc(100vw - 280px)', // Adjust as needed for larger screens
  );

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth < 1024 ? 'calc(100vw - 45px)' : 'calc(100vw - 280px)');
    };

    // Listen for window resize events
    window.addEventListener('resize', updateWidth);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      style={{ width }}
      grabCursor={true}
      slidesPerView={'auto'}
      direction="horizontal"
    >
      {children}
    </Swiper>
  );
};
