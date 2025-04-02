import classNames from "classnames/bind";
import styles from "./hero.module.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MailBox from "../../../components/mail/mail";
import Button from "../../../components/button/button";

const cx = classNames.bind(styles);

const Hero = () => {
  const user = localStorage.getItem("user");
  return (
    <div className={cx("hero")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h1>Unlimited movies, TV shows, and more</h1>
            <p
              className={cx("desc")}
              style={{ fontSize: "2.4rem", padding: "15px 0" }}
            >
              Watch anywhere. Cancel anytime.
            </p>
            {!user ? (
              <>
                <p className={cx("desc")} style={{ padding: "15px 0 20px 0" }}>
                  Ready to watch? Enter your email or mobile number to create
                  orrestart your membership.
                </p>
                <MailBox />
              </>
            ) : (
              <Button path={"/"}>
                <span style={{ fontSize: "2.5rem" }}>
                  Get Started
                  <KeyboardArrowRightIcon
                    style={{ fontSize: "3.5rem", paddingBottom: 4 }}
                  />
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
