import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RefObject } from 'react';
import { SwiperRef } from 'swiper/react';

type SwiperSlideButtonsProps = {
  swiperRef: RefObject<SwiperRef>;
};

export const SwiperSlideButtons = ({ swiperRef }: SwiperSlideButtonsProps) => {
  return (
    <div className="flex gap-3 py-2 text-2xl">
      <button
        className="text-textPrimary duration-150 hover:scale-105 hover:text-aqua"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.swiper.slidePrev();
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        className="text-textPrimary duration-150 hover:scale-105 hover:text-aqua"
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.swiper.slideNext();
          }
        }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};
