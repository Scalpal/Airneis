import styles from "@/styles/components/InputRange.module.css"; 

const InputRange = (props) => {
  const { label, currentValue, handler } = props;

  return (
    <div>
      <label className={styles.label}>
        <span className={styles.labelTitle}>{label} :</span>
        <span className={styles.labelValue}> {currentValue}$</span>
      </label>
      <input
        type="range"
        min={0}
        max={1600}
        value={currentValue}
        className={styles.input}
        onInput={handler}
      />
    </div>

  );
};

export default InputRange;