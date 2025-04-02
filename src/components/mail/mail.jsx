import classNames from "classnames/bind";
import styles from "./mail.module.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Button from "../button/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const MailBox = () => {
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [checkMail, setCheckMail] = useState(false);
  const navigate = useNavigate();
  const mailBoxRef = useRef(null);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleGetStartedClick = () => {
    if (validateEmail(email)) {
      sessionStorage.setItem("email", email);
      setCheckMail(true);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event) => {
    if (mailBoxRef.current && !mailBoxRef.current.contains(event.target)) {
      setClick(false);
    }
    if(email.length > 0) {
      setClick(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (checkMail) {
      navigate("/auth/register");
    }
  }, [checkMail, navigate]);

  return (
    <div className={cx("mail-box")} ref={mailBoxRef}>
      <div className={cx("mail-input")}>
        {click ? (
          <>
            <strong
              className={cx("mail-desc-show")}
              onFocus={() => setClick(true)}
              onBlur={() => setClick(false)}
            >
              Email or mobile number
            </strong>{" "}
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </>
        ) : (
          <strong
            className={cx("mail-desc")} 
            onClick={() => setClick(true)}
          >
            Email or mobile number
          </strong>
        )}
      </div>
      <Button onClick={handleGetStartedClick}>
        <span style={{ fontSize: "2.5rem" }}>
          Get Started
          <KeyboardArrowRightIcon
            style={{ fontSize: "3.5rem", paddingBottom: 4 }}
          />
        </span>
      </Button>
    </div>
  );
};

export default MailBox;
