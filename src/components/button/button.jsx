import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./button.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Button = ({ path, onClick, children }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(path);
  };
  return (
    <button 
      className={cx("btn-modify")} 
      onClick={handleClick}
    >
      {children}
    </button>
  );
};


Button.propTypes = {
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Button;
