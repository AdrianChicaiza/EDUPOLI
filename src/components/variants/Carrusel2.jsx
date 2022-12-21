import React from "react";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import { CardCarrera } from "./CardCarrera";

// https://react-multi-carousel.surge.sh/?selectedKind=Carousel&selectedStory=Without%20infinite%20mode&full=0&addons=1&stories=1&panelRight=0&addonPanel=kadira%2Fjsx%2Fpanel
export const Carrusel2 = ({ carrera }) => {
  const images = [...Array(6).keys()];
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 4,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {images.map((e, i) => (
        <div
          key={i}
          //className="rounded-lg overflow-hidden shadow-lg bg-white max-w-xs"
        >
          <CardCarrera carrera={carrera} />
        </div>
      ))}
      {/* <CardCarrera carrera={carrera} /> */}
      {/* <CardCarrera carrera={carrera} />
      <CardCarrera carrera={carrera} />
      <CardCarrera carrera={carrera} />
      <CardCarrera carrera={carrera} />
      <CardCarrera carrera={carrera} />       */}
    </Carousel>
  );
};
