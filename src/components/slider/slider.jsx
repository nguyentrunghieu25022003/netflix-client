import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./slider.module.scss";
import { Link, useParams } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useNotifications } from "../socket/socket";
import { fetchAllNotifications } from "../../api";

const cx = classNames.bind(styles);

const ImageSlider = ({ images }) => {
  const { setNotifications } = useNotifications();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaState, setMediaState] = useState({
    isReady: false,
    muted: true,
    videoLoaded: false,
  });
  const playerRef = useRef(null);
  const { slug } = useParams();
  const userFromStorage = localStorage.getItem("user");
  const userObject = JSON.parse(userFromStorage);
  const email = userObject?.email;
  const options = {
    withCredentials: true,
  };

  const handleVideoEnded = () => {
    playerRef.current.seekTo(0);
  };

  useEffect(() => {
    const handleSlideChange = () => {
      setMediaState((prev) => ({ ...prev, videoLoaded: false, isReady: false }));
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const timer = setTimeout(handleSlideChange, 50000);
    return () => clearTimeout(timer);
  }, [images.length, mediaState.isReady]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMediaState((prev) => ({ ...prev, videoLoaded: true }));
    }, 15000);

    return () => clearTimeout(timerId);
  }, [currentIndex]);

  const handleVideoReady = () => {
    setMediaState((prev) => ({ ...prev, isReady: true }));
  };

  const toggleMuted = () => {
    setMediaState((prev) => ({ ...prev, muted: !prev.muted }));
  };

  const handleAddMyList = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        userEmail: email,
        movieSlug: currentImage.slug
      }
      await axios.post(
        `${import.meta.env.VITE_API_URL}/movies/my-list/add/${slug}`,
        formData, 
        options
      );
      const notificationsResponse = await fetchAllNotifications(options);
      setNotifications(notificationsResponse.messages);
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  }

  const currentImage = images[currentIndex] || {};

  return (
    <div className={cx("slider")}>
      {images.length > 0 && (
        <div className={cx("img-slider")}>
          {!mediaState.videoLoaded ? (
            <img
              className={cx("active")}
              src={currentImage.thumbUrl || ""}
              alt={`slide ${currentIndex}`}
            />
          ) : (
            currentImage.video && (
              <div className={cx("video-wrapper")}>
                <ReactPlayer
                  url={currentImage.video}
                  width="100%"
                  height="625px"
                  playing={true}
                  controls={false}
                  muted={mediaState.muted}
                  onReady={handleVideoReady}
                  onEnded={handleVideoEnded}
                  className={cx("react-layer")}
                  
                />
                <div className={cx("video-hover-overlay")}></div>
              </div>
            )
          )}
          {currentImage.name && (
            <>
              <div className={cx("desc-slider", "active")}>
                <div className="d-flex align-items-center gap-3">
                  <img src={"/assets/imgs/netflix-logo.png"} alt="Logo" className={cx("logo")} />
                  <strong className={cx("type")}>{currentImage.type}</strong>
                </div>
                <h3>{currentImage.name}</h3>
                <div className={cx("more")}>
                  <p>{currentImage.year}</p>
                  <span>|</span>
                  <p>{currentImage.quality}</p>
                  <span>|</span>
                  <p>{currentImage.lang === "Thuyết Minh" ? "Explanatory" : currentImage.lang}</p>
                </div>
                <p className="pt-3 pb-3">{currentImage.content}</p>
                <div className={cx("btn-group")}>
                  <Link
                    className={cx("btn-play")}
                    to={`/movie/detail/${currentImage.slug}/tap-1`}
                  >
                    <button>
                      <PlayArrowIcon className={cx("icon")} />
                      Play
                    </button>
                  </Link>
                  <form className={cx("btn-add")} onSubmit={handleAddMyList}>
                    <input type="hidden" name="userEmail" value={email} />
                    <input type="hidden" name="movieSlug" value={slug} />
                    <button type="submit">
                      <AddIcon className={cx("icon")} />
                      My list
                    </button>
                  </form>
                </div>
              </div>
              <div className={cx("mute-wrapper")}>
                <div className={cx("mute")} onClick={toggleMuted}>
                  {mediaState.muted ? (
                    <VolumeOffIcon className={cx("icon")} />
                  ) : (
                    <VolumeUpIcon className={cx("icon")} />
                  )}
                </div>
                <div className={cx("age")}>
                  <strong>12+</strong>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      thumbUrl: PropTypes.string,
      video: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      year: PropTypes.number,
      quality: PropTypes.string,
      lang: PropTypes.string,
      content: PropTypes.string
    })
  ).isRequired
};

export default ImageSlider;