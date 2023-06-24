import styles from "@/styles/backoffice/ImageInput.module.css";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
 
const ImageInput = (props) => {
  const { id, text, onChangeEvent } = props;

  return (
    <>
      <input
        type="file"
        name="file"
        hidden
        id={id}
        onChange={onChangeEvent}
      />

      <label
        className={styles.label}
        htmlFor={id}
      >
        <PlusCircleIcon className={styles.labelIcon} />
        {text}
      </label>
    </>
  );
};

export default ImageInput;