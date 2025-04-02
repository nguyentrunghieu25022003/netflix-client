import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import { getMyProfile } from "../../api";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading/loading";

const cx = classNames.bind(styles);

const Profile = () => {
  const [profile, setProfile] = useState({});
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const options = {
    withCredentials: true,
  };
  const [isLoading, setIsLoading] = useState(true);
  const userFromStorage = localStorage.getItem("user");
  const userObject = JSON.parse(userFromStorage);
  const avatarUrl = userObject?.avatar;
  const email = userObject?.email;
  const [state, setState] = useState({
    name: "",
    email: email,
  });

  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      const response = await getMyProfile(options);
      setProfile(response);
      setState((prev) => ({ ...prev, name: response.name }));
      setIsLoading(false);
    };
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelEdit = () => {
    setState((prevState) => ({
      ...prevState,
      emailClick: false,
      nameClick: false,
    }));
  };

  const handleNameChange = (e) => {
    setState((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const userName = nameInputRef.current.value;
      const userEmail = emailInputRef.current.value;
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/profile/edit`,
        {
          userName: userName,
          userEmail: userEmail,
        },
        options
      );
      if (response.status === 200) {
        console.log("Successfully updated !");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImgError = (event) => {
    event.target.src = profile.avatar;
  };

  const formatDate = (myDate) => {
    const date = new Date(myDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("profile")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h2>My Profile</h2>
          </div>
        </div>
        <div className="row">
          <div
            className={cx(
              "col-xl-4 col-lg-3 col-md-12 col-sm-12 profile-custom"
            )}
          >
            <div className={cx("profile-img")}>
              <LazyLoadImage
                src={`${import.meta.env.VITE_SERVER_URL}${avatarUrl}`}
                alt="avatar"
                effect="blur"
                onError={handleImgError}
              />
            </div>
            <div className={cx("profile-inf")}>
              <span className={cx("profile-text")}>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={state.name}
                  onChange={handleNameChange}
                  className={cx("profile-input")}
                />
              </span>
              <span className={cx("profile-text")}>
                <input
                  ref={emailInputRef}
                  type="text"
                  value={state.email}
                  disabled
                  className={cx("profile-input")}
                />
              </span>
              <span className={cx("profile-status")}>
                Status: <button>{profile.isLocked ? "Lock" : "Unlock"}</button>
              </span>
              <span className={cx("profile-create-at")}>
                Create at {formatDate(profile.createAt)}
              </span>
              <form className={cx("d-flex gap-4 mt-5")} onSubmit={handleEdit}>
                <button
                  className={cx("btn-cancel")}
                  onClick={cancelEdit}
                  type="button"
                >
                  Cancel
                </button>
                <button className={cx("btn-save")} type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
          <div className="col-xl-8 col-lg-9 col-md-12 col-sm-12">
            <div className={cx("dragon-fly")}>
              <img src={"/assets/imgs/dragon.gif"} alt="dragon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
