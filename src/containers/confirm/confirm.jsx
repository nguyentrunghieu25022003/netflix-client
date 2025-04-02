import classNames from "classnames/bind";
import styles from "./confirm.module.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const ConfirmPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState(false);
  const email = sessionStorage.getItem("email");
  const navigate = useNavigate();

  const handleConfirmCode = async (event) => {
    event.preventDefault();
    try {
      console.log(code);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/forgot-password/confirm-code`,
        {
          code: code,
        }
      );
      if (response.status === 200) {
        setConfirmCode(true);
        console.log("Confirm success !");
      }
    } catch (error) {
      console.error("Failed ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/forgot-password/new-password`,
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        console.log("Success !");
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Failed ", error);
    }
  };
  return (
    <div className={cx("forgot-password")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className={cx("content")}>
              <h3>Confirm And Reset Password</h3>
              <p>
                Enter the confirmation code below. The confirmation code is only
                valid for 5 minutes.
              </p>
              <form
                className={cx("form-check-code")}
                onSubmit={handleConfirmCode}
              >
                <input
                  type="text"
                  name="code"
                  value={code}
                  className="form-control"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Example: 3210"
                />
                <button type="submit">Confirm</button>
              </form>
              <form
                className={cx("form-submit")}
                onSubmit={confirmCode ? handleSubmit : ""}
              >
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password..."
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  className="form-control"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password..."
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;