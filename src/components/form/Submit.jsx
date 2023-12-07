import styles from "./Submit.module.css";

const Submit = ({ label }) => (
  <button className={styles.submit} type="submit">
    {label}
  </button>
);

export default Submit;
