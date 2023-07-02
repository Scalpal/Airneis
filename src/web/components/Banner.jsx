import styles from "@/styles/components/Banner.module.css";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import BackToTopButton from "./BackToTopButton";
import { classnames, nunito } from "@/pages/_app";
import ImageWithFallback from "./ImageWithFallback";

const Banner = (props) => {
  const { title, image } = props;
  const anchorRef = useRef(null);

  const handleClick = () => {
    const element = anchorRef.current;

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={classnames(
        styles.banner,
        nunito.className
      )}
      id="carousel"
    >
      <h1
        className={styles.bannerTitle}
        id="bannerTitle"
      >
        {title}
      </h1>

      <ImageWithFallback
        className={styles.bannerImage}
        src={image}
        placeholder={"blur"}
        blurDataURL={"/loading-image-placeholder.jpg"}
        fallbackSrc={"/meuble-4.jpeg"}
        alt="Banner image"
        fill
      />

      <button className={styles.anchorButton} onClick={() => handleClick()}>
        <ArrowSmallDownIcon className={styles.icon} />
      </button>

      <div ref={anchorRef} id="" className={styles.belowBanner}></div>

      <BackToTopButton onPress={handleClick} />
    </header>
  );
};

export default Banner;
