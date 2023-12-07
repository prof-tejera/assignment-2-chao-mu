import styles from "./Button.module.css";

import { useNavigate } from "react-router-dom";

const Button = ({ children, to, onClick, ...props }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      {...props}
      className={styles.button}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
