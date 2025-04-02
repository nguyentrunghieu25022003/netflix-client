import classNames from "classnames/bind";
import styles from "./history.module.scss";
import { fetchAllHistory } from "../../api/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../../components/loading/loading";

const cx = classNames.bind(styles);

const UserHistory = () => {
  const [histories, setHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const options = {
    withCredentials: true,
  };

  const getAllHistory = async () => {
    try {
      const response = await fetchAllHistory(options);
      setHistories(response.movieList);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching history:", err);
      setIsLoading(false);
    }
  };

  const handleEpisode = (myString) => {
    let myResult = "";
    const tmp = myString.split(" ");
    if (tmp[1] && tmp[1].includes("phút/tập")) {
      myResult = tmp[0] + " " + "min/ep";
    } else {
      myResult = tmp[0] + " " + "min";
    }
    return myResult;
  };

  useEffect(() => {
    setIsLoading(true);
    getAllHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("history")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>History</h3>
          </div>
        </div>
        {histories.length > 0 ? (
          <div className={cx("row")}>
            {histories.map((item, index) => (
              <div
                key={index}
                className={cx("movie-item col-xl-3 col-lg-4 col-md-6 mt-5 p-5")}
              >
                <div className={cx("movie-img")}>
                  <LazyLoadImage
                    src={item.poster_url}
                    effect="blur"
                    alt={item.origin_name}
                  />
                </div>
                <div className={cx("movie-desc")}>
                  <h5 className={cx("movie-title")}>
                    {item.origin_name} {`(${item.year})`}
                  </h5>
                  <strong className="mt-3">
                    Current Episode: <button>{item.episode}</button>
                  </strong>
                  <strong className="mt-2">
                    Time: {handleEpisode(item.time)}
                  </strong>
                  <Link
                    className={cx("btn-play")}
                    to={`/movie/detail/${item.slug}/tap-${item.episode}`}
                    onClick={() => {
                      localStorage.setItem(
                        "currentIndexData",
                        JSON.stringify({
                          key: item.slug,
                          currentIndex: item.episode,
                        })
                      );
                    }}
                  >
                    Play
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <strong className={cx("no-history")}>
              You have not watched any movies yet.
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHistory;