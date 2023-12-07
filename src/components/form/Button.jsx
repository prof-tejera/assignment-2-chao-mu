import styles from "./Button.module.css";

const Button = ({ children, ...props }) => (
  <button {...props} className={styles.button} type="submit">
    {children}
  </button>
);

export default Button;
