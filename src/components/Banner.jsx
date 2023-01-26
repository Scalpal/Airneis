import useEmblaCarousel from "embla-carousel-react";
import styles from "@/styles/Banner.module.css";

const Banner = () => {

  const [emblaRef] = useEmblaCarousel(); 

  return (
    <div className={styles.banner} ref={emblaRef}>
      <div className={styles.bannerSlidesContainer}>

      </div>
    </div>
  );
};

export default Banner; 