import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import Button from "../button/button";
import Languages from "../language/language";

const Header = () => {
  const userFromStorage = localStorage.getItem("user");
  const signInOutButton = userFromStorage ? (
    <Button path="/auth/logout">
      <span style={{ fontSize: "1.5rem" }}>Sign Out</span>
    </Button>
  ) : (
    <Button path="/auth/login">
      <span style={{ fontSize: "1.5rem" }}>Sign In</span>
    </Button>
  );

  return (
    <header className={styles.header}>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <Link to="/vn-en" className="d-flex align-items-center">
              <img src="/assets/imgs/201563513-c2c7a03a-7ee0-4fea-869c-76f83f2557ac.png" alt="Logo" style={{ width: "170px" }} />
            </Link>
            <div className="d-flex justify-content-between align-items-center gap-5">
              <Languages />
              {signInOutButton}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;