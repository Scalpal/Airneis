import styles from "@/styles/components/Carousel.module.css";
import Image from "next/image"; 
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"; 


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

      {images.map((image, index) => {
        return (
          <Image
            src={image.imageUrl}
            alt={"Carousel Image" + index}
            key={index}
            fill
            className={
              currentSlide === index ?
                styles.carouselSlideActive
                :
                styles.carouselSlide
            }
            style={{
              objectFit: "cover",
            }}
          />
        );
      })}

      <div className={controls ? styles.controlButtons : styles.hidden}>
        {images.map((_, index) => {
          return (
            <span
              className={
                currentSlide === index ?
                  styles.controlButtonActive
                  :
                  styles.controlButton
              }
              key={index}
              onClick={() => { setCurrentSlide(index); }}
            >
            </span>
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
        <ArrowRightIcon className={styles.icon}/>
      </button>
    </div>
  );
};

export default Carousel; 