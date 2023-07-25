import { classnames } from "@/pages/_app";
import styles from "@/styles/backoffice/ImageInput.module.css";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
 
const ImageInput = (props) => {
  const { id, text, onChangeEvent, disabled } = props;

  return (
    <>
      <input
        type="file"
        name="file"
        hidden
        id={id}
        disabled={disabled}
        onChange={onChangeEvent}
        multiple
      />

      <label
        className={classnames(
          styles.label,
          disabled ? styles.disabled : ""
        )}
        htmlFor={id}
      >
        <PlusCircleIcon className={styles.labelIcon} />
        {text}
      </label>
    </>
  );
};

export default ImageInput;