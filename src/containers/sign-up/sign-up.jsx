import classNames from "classnames/bind";
import styles from "./sign-up.module.scss";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Register = () => {
  const [userData, setUserData] = useState({
    emailClick: false,
    passwordClick: false,
    name: "",
    email: sessionStorage.getItem("email") || "",
    password: "",
    status: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      const fileInput = document.querySelector('input[type="file"]');
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      if (fileInput && fileInput.files[0]) {
        formData.append("avatar", fileInput.files[0]);
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 200) {
        setUserData((prev) => ({
          ...prev,
          status: true,
        }));
        return;
      }
      window.location.href = "/auth/login";
    } catch (error) {
      setUserData((prev) => ({
        ...prev,
        status: true,
      }));
      console.error("Registration error:", error.response);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setUserData((prevData) => ({
        ...prevData,
        emailClick: true,
        [name]: value,
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        passwordClick: true,
        [name]: value,
      }));
    }
  };

  return (
    <div className={cx("register-page")}>
      <header className={cx("header")}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to="/">
                <img src="/assets/imgs/201563513-c2c7a03a-7ee0-4fea-869c-76f83f2557ac.png" alt="Logo" style={{ width: "170px" }} />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className={cx("register-form")}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className={cx("input-box")}>
                  <input
                    type="file"
                    className={cx("user-input")}
                    name="avatar"
                  />
                  <input
                    type="text"
                    className={cx("user-input")}
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    className={cx("user-input")}
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  {userData.emailClick &&
                    !userData.email.includes("@gmail.com") && (
                      <strong className={cx("warning")}>
                        Invalid email, please check again
                      </strong>
                    )}
                  <input
                    type="password"
                    className={cx("user-input")}
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                  {userData.passwordClick && userData.password.length < 6 && (
                    <strong className={cx("warning")}>
                      Password must be more than 6 characters
                    </strong>
                  )}
                  {userData.status && (
                    <strong className={cx("warning")}>
                      Unable to sign up, please check again
                    </strong>
                  )}
                </div>
                <button type="submit" className={cx("sign-up")}>
                  Sign Up
                </button>
                <div className={cx("sign-in")}>
                  <p>Already have an account?</p>
                  <Link to="/auth/login" className={cx("sign-in-link")}>
                    Sign in now
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;