import classNames from "classnames/bind";
import styles from "./edit-movie.module.scss";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { dataCategory, dataCountry } from "../../constants/constants";

const cx = classNames.bind(styles);

const EditMoviePage = () => {
  const [state, setState] = useState({
    created: "",
    name: "",
    slug: "",
    origin_name: "",
    content: "",
    type: "",
    status: "",
    poster_url: "",
    thumb_url: "",
    trailer_url: "",
    time: "",
    episode_current: "",
    episode_total: "",
    quality: "",
    lang: "",
    year: "",
    actor: "",
    director: "",
    category: [],
    country: [],
  });
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [countryClicked, setCountryClicked] = useState(false);
  const [movieData, setMovieData] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;
  const movieId = currentPath.split("/")[4];

  const handleGetDataMovie = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/edit/${movieId}`
      );
      if (response.status === 200) {
        setMovieData({ movie: response.data.movie });
        setEpisodes(response.data.episodes[0].server_data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetDataMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/edit/${movieId}/upload`,
        {
          ...state,
        }
      );
      if (response.status === 200) {
        console.log("Success !");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeForm = (currentValue, event) => {
    setState((prev) => ({ ...prev, [currentValue]: event.target.value }));
  };

  const handleSelectChange = (currentValue, event) => {
    const { checked, dataset } = event.target;
    const id = dataset.key;
    const name = event.target.nextSibling.textContent.trim();
    const slug = dataset.slug;
    setState((prevState) => {
      const exists = prevState[currentValue].some((item) => item.slug === slug);
      if (checked && !exists) {
        return {
          ...prevState,
          [currentValue]: [...prevState[currentValue], { id, name, slug }],
        };
      } else if (!checked && exists) {
        return {
          ...prevState,
          [currentValue]: prevState[currentValue].filter(
            (item) => item.slug !== slug
          ),
        };
      }
      return prevState;
    });
  };

  return (
    <div className={cx("create-movie-page")}>
      <form className={cx("form-add-movie")} onSubmit={handleSubmit}>
        <h3>Edit Movie</h3>
        <input
          type="text"
          name="name"
          value={movieData.movie?.name}
          onChange={(e) => handleChangeForm("name", e)}
          placeholder="Name"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="slug"
          value={movieData.movie?.slug}
          onChange={(e) => handleChangeForm("slug", e)}
          placeholder="Slug"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="origin_name"
          value={movieData.movie?.origin_name}
          onChange={(e) => handleChangeForm("origin_name", e)}
          placeholder="Origin Name"
          className={cx("form-input")}
          required
        />
        <textarea
          rows="10"
          name="content"
          value={movieData.movie?.content}
          onChange={(e) => handleChangeForm("content", e)}
          placeholder="Content"
          className={cx("form-input")}
          required
        />
        <select
          name="type"
          value={movieData.movie?.type}
          onChange={(e) => handleChangeForm("type", e)}
          className={cx("form-select")}
        >
          <option value="hoathinh">hoathinh</option>
          <option value="series">series</option>
          <option value="single">single</option>
          <option value="tvshows">tvshows</option>
        </select>
        <select
          name="status"
          value={movieData.movie?.status}
          onChange={(e) => handleChangeForm("status", e)}
          className={cx("form-select")}
        >
          <option value="ongoing">ongoing</option>
          <option value="completed">completed</option>
        </select>
        <input
          type="text"
          name="poster_url"
          value={movieData.movie?.poster_url}
          onChange={(e) => handleChangeForm("poster_url", e)}
          placeholder="Poster"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="thumb_url"
          value={movieData.movie?.thumb_url}
          onChange={(e) => handleChangeForm("thumb_url", e)}
          placeholder="Thumbnail"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="trailer_url"
          value={movieData.movie?.trailer_url}
          onChange={(e) => handleChangeForm("trailer_url", e)}
          placeholder="Trailer"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="time"
          value={movieData.movie?.time}
          onChange={(e) => handleChangeForm("time", e)}
          placeholder="Time"
          className={cx("form-input")}
        />
        <input
          type="text"
          name="episode_current"
          value={movieData.movie?.episode_current}
          onChange={(e) => handleChangeForm("episode_current", e)}
          placeholder="Episode Current"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="episode_total"
          value={movieData.movie?.episode_total}
          onChange={(e) => handleChangeForm("episode_total", e)}
          placeholder="Episode Total"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="quality"
          value={movieData.movie?.quality}
          onChange={(e) => handleChangeForm("quality", e)}
          placeholder="Quality"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="lang"
          value={movieData.movie?.lang}
          onChange={(e) => handleChangeForm("lang", e)}
          placeholder="Lang"
          className={cx("form-input")}
          required
        />
        <select
          name="year"
          value={movieData.movie?.year}
          onChange={(e) => handleChangeForm("year", e)}
          className={cx("form-select")}
        >
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
        <input
          type="text"
          name="actor"
          value={movieData.movie?.actor}
          onChange={(e) => handleChangeForm("actor", e)}
          placeholder="Actor"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="director"
          value={movieData.movie?.director}
          onChange={(e) => handleChangeForm("director", e)}
          placeholder="Director"
          className={cx("form-input")}
          required
        />
        <div className={cx("form-item")}>
          <div
            className={cx("select-item")}
            onClick={() => {
              setCategoryClicked(!categoryClicked);
              setCountryClicked(false);
            }}
          >
            <strong>Category</strong>
            <KeyboardArrowDownIcon className={cx("icon")} />
          </div>
          {categoryClicked && (
            <ul name="category" className={cx("list")}>
              {dataCategory.map((category) => {
                return (
                  <li key={category.slug}>
                    <input
                      type="checkbox"
                      checked={state.category.some(
                        (c) => c.slug === category.slug
                      )}
                      onChange={(event) =>
                        handleSelectChange("category", event)
                      }
                      data-key={category.key}
                      data-slug={category.slug}
                    />
                    {category.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className={cx("form-item")}>
          <div
            className={cx("select-item")}
            onClick={() => {
              setCountryClicked(!countryClicked);
              setCategoryClicked(false);
            }}
          >
            <strong>Country</strong>
            <KeyboardArrowDownIcon className={cx("icon")} />
          </div>
          {countryClicked && (
            <ul name="country" className={cx("list")}>
              {dataCountry.map((country) => {
                return (
                  <li key={country.slug}>
                    <input
                      type="checkbox"
                      checked={state.category.some(
                        (c) => c.slug === country.slug
                      )}
                      onChange={(event) =>
                        handleSelectChange("category", event)
                      }
                      data-key={country.key}
                      data-slug={country.slug}
                    />
                    {country.name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <h4 className={cx("episode-title")}>Episodes</h4>
        <div>
          {episodes.map((episode, index) => {
            return (
              <div key={index} className={cx("episode-item")}>
                <label>{episode.name}</label>
                <input
                  type="text"
                  name="episodes"
                  value={episode.link_embed}
                  className={cx("form-input")}
                />
              </div>
            );
          })}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditMoviePage;
