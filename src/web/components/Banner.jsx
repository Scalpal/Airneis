import Image from "next/image";
import styles from "@/styles/components/Banner.module.css";
import { ArrowSmallDownIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import BackToTopButton from "./BackToTopButton";

const Banner = (props) => {
  const { title } = props;
  const anchorRef = useRef(null);

  const handleClick = () => {
    const element = anchorRef.current;

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={styles.banner} id="carousel">
      <h1
        className={styles.bannerTitle}
        id="bannerTitle"
      >
        {title}
      </h1>
      <Image
        src={"/meuble-6.jpg"}
        alt="Banner image"
        fill
        className={styles.bannerImage}
      />

      <button
        className={styles.anchorButton}
        onClick={() => handleClick()}
      >
        <ArrowSmallDownIcon className={styles.icon} />
      </button>

      <div ref={anchorRef} id="" className={styles.belowBanner}></div>

      <BackToTopButton onPress={handleClick} />

    </header>
  );
};

export default Banner;
