import styles from "./Button.module.css";

import { useNavigate } from "react-router-dom";

/**
 * Button component that handles navigation and click events.
 * @param {Object} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content within the button.
 * @param {string} [props.to] - The URL to navigate when the button is clicked.
 * @param {function(Event): void} [props.onClick] - Function to handle click events.
 * @returns {JSX.Element} JSX element representing the button.
 */
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
