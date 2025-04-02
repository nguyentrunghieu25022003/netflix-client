import classNames from "classnames/bind";
import styles from "./ranking.module.scss";
import { fetchAllRanking } from "../../api/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Loading from "../loading/loading";

const cx = classNames.bind(styles);

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 600,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const getRanking = async () => {
      try {
        const response = await fetchAllRanking();
        setRanking(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };
    getRanking();
  }, []);

  const handlePrevPage = () => {
    setCurrentIndex((prevPage) => {
      if (prevPage === 1) {
        return Math.ceil(ranking.length / 4);
      } else {
        return Math.max(prevPage - 1, 1);
      }
    });
  };

  const handleNextPage = () => {
    setCurrentIndex((prevPage) => {
      if (prevPage === Math.ceil(ranking.length / 4)) {
        return 1;
      } else {
        return prevPage + 1;
      }
    });
  };

  const handleEpisode = (episode_current) => {
    let myString = "";
    if (episode_current.includes("Tập")) {
      myString = "Episode ";
      myString += episode_current.slice(4, episode_current.length);
    } else if (episode_current.includes("Hoàn Tất")) {
      myString = "Full ";
      myString += episode_current.slice(9, episode_current.length);
    } else if (episode_current === "Full") {
      myString = episode_current;
    }
    return myString;
  };

  const startIndex = (currentIndex - 1) * 4;
  const endIndex = Math.min(startIndex + 4, ranking.length);
  const currentMovies = ranking.slice(startIndex, endIndex);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("ranking")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Popular</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-5">
            <div className={cx("btn-group")}>
              <button className={cx("btn-click")} onClick={handlePrevPage}>
                <ChevronLeftIcon className={cx("icon")} />
              </button>
              <button className={cx("btn-click")} onClick={handleNextPage}>
                <ChevronRightIcon className={cx("icon")} />
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {currentMovies.map((item) => {
            const {
              name,
              origin_name,
              poster_url,
              slug,
              episode_current,
              year,
              view,
            } = item.movie;
            let episode = "tap-1";
            if (episode_current.includes("Full")) {
              episode = "tap-full";
            }
            return (
              <div
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-12"
                key={name}
              >
                <div className={cx("movie-item")}>
                  <Link
                    to={`/movie/detail/${slug}/${episode}`}
                    onClick={scrollToTop}
                  >
                    <div className={cx("movie-top")}>
                      <p className={cx("movie-status")}>
                        {handleEpisode(episode_current)}
                      </p>
                    </div>
                    <LazyLoadImage src={poster_url} effect="blur" alt="Error" />
                    <PlayCircleIcon
                      className={cx("play-icon")}
                      style={{ fontSize: "50px" }}
                    />
                    <b>
                      <RemoveRedEyeIcon className={cx("icon")} /> {view}
                    </b>
                    <span className={cx("triangle")}></span>
                    <h5 className={cx("movie-title")}>
                      {origin_name} {`(${year})`}
                    </h5>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
