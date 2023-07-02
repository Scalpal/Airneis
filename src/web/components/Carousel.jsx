import styles from "@/styles/components/Carousel.module.css";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import ImageWithFallback from "./ImageWithFallback";
import Image from "next/image";

const Carousel = (props) => {
  const { images, Autoplay, controls } = props;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay] = useState(Autoplay);

  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, images.length]);

  const previousSlide = useCallback(() => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }, [currentSlide, images.length]);

  useEffect(() => {
    if (autoplay) {
      const timeoutId = setTimeout(() => {
        nextSlide();
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  });

  return (
    <div className={styles.carouselContainer} id="carousel">
      {images.length > 0 ? (
        images.map((image, index) => {
          return (
            <ImageWithFallback
              key={index}
              alt={`Home carousel image ${index}`}
              src={image.imageUrl}
              fallbackSrc={`/placeholder-image.png`}
              className={
                currentSlide === index
                  ? styles.carouselSlideActive
                  : styles.carouselSlide
              }
              style={{
                objectFit: "cover"
              }}
              fill
            />
          );
        })
      ) : (
        <Image
          className={styles.carouselSlideActive}
          alt={"Home carousel image"}
          src={"/placeholder-image.png"}
          style={{
            objectFit: "cover"
          }}
          fill
        />
      )}

      <div className={controls ? styles.controlButtons : styles.hidden}>
        {images.map((_, index) => {
          return (
            <span
              className={
                currentSlide === index
                  ? styles.controlButtonActive
                  : styles.controlButton
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
            ></span>
          );
        })}
      </div>

      <button
        className={controls ? styles.arrowLeftButton : styles.hidden}
        onClick={() => previousSlide()}
      >
        <ArrowLeftIcon className={styles.icon} />
      </button>

      <button
        className={controls ? styles.arrowRightButton : styles.hidden}
        onClick={() => nextSlide()}
      >
        <ArrowRightIcon className={styles.icon} />
      </button>
    </div>
  );
};
export default Carousel;
