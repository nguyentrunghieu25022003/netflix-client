import classNames from "classnames/bind";
import styles from "./sign-in.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const Login = () => {
  const [userData, setUserData] = useState({
    click: false,
    moreActive: false,
    email: "",
    password: "",
    status: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userForm = {
        email: userData.email,
        password: userData.password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/auth/login`,
        userForm,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success(<strong className="fs-3">Login successful!</strong>, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setUserData((prev) => ({
          ...prev,
          status: true,
        }));
        return;
      }
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
    setUserData((prevData) => ({
      ...prevData,
      click: true,
      [name]: value,
    }));
  };

  const handleLoginGoogle = () => {
    const googleLoginURL = `${import.meta.env.VITE_API_URL}/users/auth/google`;
    window.location.href = googleLoginURL;
  };

  return (
    <div className={cx("login-page")}>
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
      <main className={cx("login-form")}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div className={cx("input-box")}>
                  <input
                    type="text"
                    className={cx("user-input")}
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  {userData.click && !userData.email.includes("@gmail.com") && (
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
                </div>
                {userData.status && (
                  <strong className={cx("warning-sign-in")}>
                    Unable to sign in, please check again
                  </strong>
                )}
                <button className={cx("sign-in")} type="submit">
                  Sign In
                </button>
                <strong className={cx("or-text")}>OR</strong>
                <div className={cx("google")}>
                  <img
                    src="/assets/imgs/Logo-google-icon-PNG.png"
                    alt="Error"
                    onClick={handleLoginGoogle}
                  />
                </div>
                <Link className={cx("forgot")} to="/forgot-password">
                  Forgot password?
                </Link>
                <div className={cx("remember")}>
                  <input type="checkbox" />
                  <strong>Remember me</strong>
                </div>
                <div className={cx("sign-up")}>
                  <p>New to Netflix?</p>
                  <Link to="/auth/register" className={cx("sign-up-link")}>
                    Sign up now
                  </Link>
                </div>
                <div className={cx("more")}>
                  <p>
                    This page is protected by Google reCAPTCHA to ensure you are
                    not a bot.
                  </p>
                  {!userData.moreActive ? (
                    <strong
                      onClick={() =>
                        setUserData((prevData) => ({
                          ...prevData,
                          moreActive: true,
                        }))
                      }
                    >
                      Learn more
                    </strong>
                  ) : (
                    <p>
                      The information collected by Google reCAPTCHA is subject
                      to the <strong>Google Privacy Policy</strong> and{" "}
                      <strong>Terms of Service</strong>, and is used for
                      providing, maintaining, and improving the reCAPTCHA
                      service and for general security purposes (it is not used
                      for personalized advertising by Google).
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Login;
