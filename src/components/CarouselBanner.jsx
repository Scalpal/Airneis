import useEmblaCarousel from "embla-carousel-react";
import styles from "@/styles/CarouselBanner.module.css";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image"; 

const CarouselBanner = () => {

  const autoplayOptions = { delay: 5000 }; 
  const PLUGINS = [Autoplay(autoplayOptions)];
  const OPTIONS = { loop: true }; 

  // Placeholder images for slider, but the structure of the pictures array will be the same (Pascal)
  const placeholderImages = [
    "/meuble-1.jpeg",
    "/meuble-2.jpeg",
    "/meuble-3.png",
  ];

  const [emblaRef] = useEmblaCarousel(OPTIONS, PLUGINS); 

  return (
    <header className={styles.banner} ref={emblaRef}>
      <div className={styles.bannerSlidesContainer}>
        
        {placeholderImages.map((imageSrc, index) => {
          return (
            <div key={index} className={styles.bannerSlide}>
              <Image
                src={imageSrc}
                alt={"Carousel Image" + index}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default CarouselBanner; 