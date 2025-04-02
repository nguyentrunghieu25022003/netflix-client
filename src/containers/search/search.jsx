import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMovies } from "../../context/movie-provider";
import classNames from "classnames/bind";
import styles from "./search.module.scss";
import Movie from "../../components/movie/movie";
import Pagination from "../../components/pagination/pagination";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { fetchMovies } from "../../api/index";
import Loading from "../../components/loading/loading";

const cx = classNames.bind(styles);

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const storedKeyword = localStorage.getItem("searchKeyword") || "";
  const keyword = searchParams.get("keyword") || storedKeyword;
  const [countMovies, setCountMovies] = useState(0);
  const {
    movies,
    setMovies,
    currentPage,
    setCurrentPage,
    totalPagesSearch,
    setTotalPagesSearch,
  } = useMovies();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const pageFromQuery = parseInt(queryParams.page) || 1;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setIsLoading(true);
      try {
        const options = {
          withCredentials: true,
        };
        const response = await fetchMovies(keyword, pageFromQuery, options);
        setMovies(response.movies);
        setCountMovies(response.totalMovies);
        setTotalPagesSearch(response.totalPagesSearch);
        setCurrentPage(pageFromQuery);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    };
    if (keyword) {
      localStorage.setItem("searchKeyword", keyword);
      loadMovies();
      setIsLoading(false);
    }
  }, [keyword, pageFromQuery, setMovies, setCurrentPage, setTotalPagesSearch]);

  const paginate = (pageNumber) => {
    navigate(`?keyword=${encodeURIComponent(keyword)}&page=${pageNumber}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("search")}>
      <div className="container">
        <div className="row" id={cx("search-result")}>
          <h2>{`Keyword: "${keyword}"`}</h2>
          <strong className={cx("search-notify")}>
            There are a total of {countMovies} results
          </strong>
          {movies.length === 0 && <b>Not found</b>}
          {movies.map((item) => {
            const {
              slug,
              poster_url,
              name,
              origin_name,
              episode_current,
              year,
            } = item.movie;
            let episode = "tap-1";
            if (episode_current.includes("Full")) {
              episode = "tap-full";
            }
            return (
              <div
                key={slug}
                className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-12"
              >
                <Movie
                  slug={slug}
                  poster_url={poster_url}
                  name={name}
                  origin_name={origin_name}
                  episode_current={episode_current}
                  episode={episode}
                  year={year}
                />
              </div>
            );
          })}
        </div>
        <Pagination
          pages={totalPagesSearch}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default SearchResult;