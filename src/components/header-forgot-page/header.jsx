import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header className={cx("header")}>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <Link to="/vn-en">
              <img src="/assets/imgs/201563513-c2c7a03a-7ee0-4fea-869c-76f83f2557ac.png" alt="Logo" style={{ width: "170px" }} />
            </Link>
            <Link to="/auth/login" className={cx("login")}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;