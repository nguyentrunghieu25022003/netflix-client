import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./movie.module.scss";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const cx = classNames.bind(styles);

const Movie = ({ slug = "", poster_url = "", origin_name = "", episode_current = "", episode = "", year = 0, view = 0 }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: "smooth",
    });
  };
  
  const handleEpisode = (episode_current) => {
    let myString = "";
    if(episode_current.includes("Tập")) {
      myString = "Episode ";
      myString += episode_current.slice(4, episode_current.length);
    } else if(episode_current.includes("Hoàn Tất")) {
      myString = "Full ";
      myString += episode_current.slice(9, episode_current.length);
    } else if(episode_current === "Full") {
      myString = episode_current;
    }
    return myString;
  };

  return (
    <div className={cx("movie-item")} onClick={scrollToTop}>
        <Link to={`/movie/detail/${slug}/${episode}`}>
          <LazyLoadImage src={poster_url} effect="blur" alt="Error" />
          <PlayCircleIcon className={cx("icon")} style={{ fontSize: "50px" }} />
          <div className={cx("movie-desc")}>
            <h5 className={cx("movie-title")}>{origin_name} {`(${year})`}</h5>
            { view !== '' && <strong className={cx("total-view")}><RemoveRedEyeIcon className={cx("view-icon")} />{view}</strong>}
          </div>
          <p className={cx("movie-status")}>{handleEpisode(episode_current)}</p>
        </Link>
    </div>
  );
};

Movie.propTypes = {
  slug: PropTypes.string.isRequired,
  poster_url: PropTypes.string.isRequired,
  origin_name: PropTypes.string.isRequired,
  episode_current: PropTypes.string.isRequired,
  episode: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  view: PropTypes.number.isRequired
};

export default Movie;