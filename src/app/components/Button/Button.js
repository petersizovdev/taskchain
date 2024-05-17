import styles from "./Button.module.scss";
import cn from "classnames";

const Button = ({ onClick, type, children, className, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cn(styles["button"], styles[className])}
    >
      {children}
    </button>
  );
};

export default Button;
