import styles from "@/styles/backoffice/ImageCard.module.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ImageCard = (props) => {
  const { image, onPress } = props;

  return (
    <div
      className={styles.wrapper}
    >
      <Image
        className={styles.image}
        alt={"Product image"}
        src={image.imageUrl ? image.imageUrl : `${process.env.AWS_BUCKET_URL}${image.imageSrc}`}
        fill
      />

      <div className={styles.overlay}>
        <XMarkIcon
          onClick={() => onPress(image.imageSrc)}
          className={styles.overlayIcon}
        />
      </div>
    </div>
  );
};

export default ImageCard;