import styles from "./Hide.module.css";

const Hide = ({ visible, children }) => (
  <span className={visible ? "" : styles.hide}>{children}</span>
);

export default Hide;
