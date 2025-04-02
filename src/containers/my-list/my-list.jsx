import classNames from "classnames/bind";
import styles from "./my-list.module.scss";
import { useEffect, useState } from "react";
import { fetchAllMyList } from "../../api/index";
import Loading from "../../components/loading/loading";
import Movie from "../../components/movie/movie";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";

const cx = classNames.bind(styles);

const MyList = () => {
  const [state, setState] = useState({
    movies: [],
    checkMovies: false,
    isActiveCheckbox: false,
    currentIndex: 1,
    isLoading: false,
  });
  const options = {
    withCredentials: true,
  };
  const userFromStorage = localStorage.getItem("user");
  const userObject = JSON.parse(userFromStorage);
  const email = userObject.email;

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetchAllMyList(options)
      .then((response) => {
        const movies = response.myList?.movie || [];
        setState((prev) => ({
          ...prev,
          movies: movies,
          checkMovies: movies.length === 0,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setState((prev) => ({ ...prev, isLoading: false, checkMovies: true }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.isLoading) {
    return <Loading />;
  }

  const handleSelectAll = () => {
    const inputList = document.querySelectorAll(".form-check-input");
    inputList.forEach((input) => {
      input.checked = true;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputList = document.querySelectorAll(".form-check-input:checked");
    const checkedValue = Array.from(inputList).map((input) => input.value);
    const formData = {
      email: email,
      movies: checkedValue,
    };
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/movies/my-list/delete`,
        { data: formData, ...options }
      );
      if (response.status === 200) {
        const updatedMovies = state.movies.filter(
          (movie) => !checkedValue.includes(movie._id)
        );
        setState((prev) => ({ ...prev, movies: updatedMovies }));
      }
    } catch (error) {
      console.error("Error during deletion:", error.response);
    }
  };

  const handlePageChange = (direction) => {
    setState((prev) => {
      const totalPages = Math.ceil(prev.movies.length / 8);
      let newIndex = prev.currentIndex;
      if (direction === "prev") {
        newIndex = newIndex > 1 ? newIndex - 1 : totalPages;
      } else {
        newIndex = newIndex < totalPages ? newIndex + 1 : 1;
      }
      return { ...prev, currentIndex: newIndex };
    });
  };

  const startIndex = (state.currentIndex - 1) * 8;
  const endIndex = Math.min(startIndex + 8, state.movies.length);
  const currentMovies = state.movies.slice(startIndex, endIndex);

  return (
    <div className={cx("movies")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h2>My List</h2>
          </div>
        </div>
        <div className={cx("btn-list")}>
          <div className={cx("custom")}>
            <button
              style={{ backgroundColor: "#111319" }}
              onClick={handleSelectAll}
            >
              Select all
            </button>
            <button
              className={cx("btn-edit")}
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  isActiveCheckbox: !prev.isActiveCheckbox,
                }))
              }
            >
              Edit
            </button>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="email" value={email} />
              <input type="hidden" name="movies" value="" />
              <button type="submit" className={cx("btn-delete")}>
                Delete
              </button>
            </form>
          </div>
          <div className={cx("btn-group")}>
            <button
              className={cx("btn-click")}
              onClick={() => handlePageChange("prev")}
            >
              <ChevronLeftIcon className={cx("icon")} />
            </button>
            <button
              className={cx("btn-click")}
              onClick={() => handlePageChange("next")}
            >
              <ChevronRightIcon className={cx("icon")} />
            </button>
          </div>
        </div>
        <div className="row" id={cx("movies-page")}>
          {state.checkMovies ? (
            <strong className={cx("warning")}>
              There are no movies in the list
            </strong>
          ) : (
            <div className="row pt-5">
              {currentMovies.map((movie) => {
                return (
                  <div
                    className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12"
                    key={movie._id}
                  >
                    {state.isActiveCheckbox && (
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={movie._id}
                        id={cx("input-custom")}
                      />
                    )}
                    <Movie
                      slug={movie.slug}
                      origin_name={movie.origin_name}
                      poster_url={movie.poster_url}
                      episode_current={movie.episode_current}
                      episode={`tap-${1}`}
                      year={movie.year}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;