import styles from "@/styles/backoffice/ImageCard.module.css";
import Image from "next/image";

const ImageCard = (props) => {
  const { title, image, addButton, editButton, deleteButton  } = props;
  
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

      {title && (
        <p className={styles.title}>{title}</p>
      )}

      <div className={styles.overlay}>
        {addButton}
        {editButton}
        {deleteButton}
      </div>
    </div>
  );
};

export default ImageCard;