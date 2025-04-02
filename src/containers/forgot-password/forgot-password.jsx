import classNames from "classnames/bind";
import styles from "./forgot.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const cx = classNames.bind(styles);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/forgot-password/send-mail`,
        {
          email: email,
        }
      );
      if (response.status === 200) {
        console.log("Success !");
        sessionStorage.setItem("email", email);
        navigate("/forgot-password/confirm");
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
            <form className={cx("form-submit")} onSubmit={handleSubmit}>
              <h3>Forgot Password</h3>
              <p>
                We will text you a verification code to reset your password.
                Message and data rates may apply.
              </p>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Email Me</button>
              <Link to="/">I ${"don't"} remember my email or phone.</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;