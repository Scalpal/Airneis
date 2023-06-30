import styles from "@/styles/components/IconButton.module.css";

const IconButton = (props) => {
  const { Icon, tooltip, onPress } = props;

  return (
    <div className={styles.wrapper}>
      <Icon
        className={styles.icon}
        onClick={onPress}
      />

      <span className={styles.tooltip}>
        {tooltip}
      </span>
    </div>
  );
};

export default IconButton;