import classNames from "classnames/bind";
import styles from "./footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("footer")}>
      <div className="container">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-md-3 col-12">
            <p>
              <Link to="">Questions? Contact us.</Link>
            </p>
            <ul className={cx("footer-list")}>
              <li>
                <Link to="">FAQ</Link>
              </li>
              <li>
                <Link to="">Investor Relations</Link>
              </li>
              <li>
                <Link to="">Privacy</Link>
              </li>
              <li>
                <Link to="">Speed Test</Link>
              </li>
              <li className={cx("group-icon")}>
                <Link>
                  <InstagramIcon className={cx("icon")} />
                </Link>
                <Link
                  to="https://www.facebook.com/profile.php?id=100048019124907"
                  target="blank"
                >
                  <FacebookIcon className={cx("icon")} />
                </Link>
                <Link>
                  <XIcon className={cx("icon")} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xxl-3 col-xl-3 col-md-3 col-12">
            <ul className={cx("footer-list")}>
              <li>
                <Link to="">Help Center</Link>
              </li>
              <li>
                <Link to="">Jobs</Link>
              </li>
              <li>
                <Link to="">Cookie Preferences</Link>
              </li>
            </ul>
          </div>
          <div className="col-xxl-3 col-xl-3 col-md-3 col-12">
            <ul className={cx("footer-list")}>
              <li>
                <Link to="">Account</Link>
              </li>
              <li>
                <Link to="">Ways to Watch</Link>
              </li>
            </ul>
          </div>
          <div className="col-xxl-3 col-xl-3 col-md-3 col-12">
            <ul className={cx("footer-list")}>
              <li>
                <Link to="">Media Center</Link>
              </li>
              <li>
                <Link to="">Terms of Use</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className={cx("footer-desc")}>
              <p>
                ©2024 Netflix. This website was created by Nguyen Trung Hieu
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;