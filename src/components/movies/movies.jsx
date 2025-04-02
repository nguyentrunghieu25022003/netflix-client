import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./movies.module.scss";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";
import Movie from "../movie/movie";
import { useEffect, useState } from "react";
import Pagination from "../pagination/pagination";
import Sort from "../sort/sort";
import Loading from "../loading/loading";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const cx = classNames.bind(styles);

const Movies = ({ fetchAllMovies, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const currentPage = parseInt(queryParams.page) || 1;
  const category = queryParams.genre || ""; 
  const country = queryParams.country || "";
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [checkMovies, setCheckMovies] = useState(false);
  const [filters, setFilters] = useState({ category, country });
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const currentIndexData = JSON.parse(localStorage.getItem("currentIndexData"));
  if (currentIndexData) {
    currentIndexData.currentIndex = 1;
    localStorage.setItem("currentIndexData", JSON.stringify(currentIndexData));
  }
  const options = {
    withCredentials: true,
  };

  const fetchMovies = async (preloadImages) => {
    try {
      const response = await fetchAllMovies(currentPage, filters, options);
      setMovies(response.movies);
      setTotalPages(response.totalPages);
      setCheckMovies(response.movies.length === 0);
      setIsLoading(false);
      return preloadImages(response.movies);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const preloadImages = async (movies) => {
      const promises = movies.map(async (movie) => {
        const img = new Image();
        img.src = movie.poster_url;
        await img.decode();
      });
      await Promise.all(promises);
    };

    preloadImages().catch((error) =>
      console.log("Error preloading images:", error)
    );

    fetchMovies(preloadImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, currentPage, fetchAllMovies]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      const currentParams = { ...queryParams };
      currentParams.page = pageNumber;
      const queryStringified = queryString.stringify(currentParams);
      navigate(`?${queryStringified}`);
    }
  };

  const handleSortChange = (newFilters) => {
    setFilters(newFilters);
    paginate(1);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowSize = window.innerHeight;
      const bodyHeight = document.body.offsetHeight;
      const scrolled = (scrollPosition + windowSize) / bodyHeight;
      if (scrolled > 0.5) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("movies")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <Sort
              fetchMovies={() => fetchAllMovies(currentPage, filters, options)}
              onSortChange={handleSortChange}
            />
          </div>
        </div>
        <div className="row" id={cx("movies-page")} key={currentPage}>
          {checkMovies ? (
            <strong className={cx("warning")}>
              There are no movies in this genre/country
            </strong>
          ) : (
            movies.map((item) => {
              const {
                slug,
                poster_url,
                origin_name,
                episode_current,
                year,
                view,
              } = item.movie;
              let episode = 1;
              if (episode_current.includes("Full")) {
                episode = "full";
              }
              return (
                <div
                  key={slug}
                  className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-12"
                >
                  <Movie
                    slug={slug}
                    poster_url={poster_url}
                    origin_name={origin_name}
                    episode_current={episode_current}
                    episode={`tap-${episode}`}
                    year={year}
                    view={view}
                  />
                </div>
              );
            })
          )}
        </div>
        <Pagination
          pages={totalPages}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      {showButton && (
        <div className={cx("scroll-to-top")} onClick={handleScrollToTop}>
          <KeyboardArrowUpIcon className={cx("icon")} />
        </div>
      )}
    </div>
  );
};

Movies.propTypes = {
  fetchAllMovies: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Movies;