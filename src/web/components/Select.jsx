import styles from "@/styles/components/Select.module.css"; 

const Select = (props) => {
  const { children, ...otherProps } = props; 
  
  return (
    <select
      className={styles.select}
      {...otherProps}
    >
      {children}
    </select>
  );
};

export default Select;