import classNames from "classnames/bind";
import styles from "./header.module.scss";
import axios from "axios";
import useAuthToken from "../../utils/auth";

const cx = classNames.bind(styles);

const Header = () => {
  const { userToken } = useAuthToken();
  const options = {
    withCredentials: true,
  };
  
  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/auth/logout`,
        options
      );
      if (response.status === 200) {
        console.log("Logout successful!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <header className={cx("header")}>
      <div className="container">
        <div className="col-12 d-flex align-items-center justify-content-between">
          <h2>Administrator</h2>
          {userToken && (
            <form className={cx("form-logout")} onSubmit={handleLogout}>
              <button type="submit" className={cx("log-out")}>
                Log out
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;