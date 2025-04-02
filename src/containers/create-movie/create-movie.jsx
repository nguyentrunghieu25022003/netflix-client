import classNames from "classnames/bind";
import styles from "./create-movie.module.scss";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { dataCategory, dataCountry } from "../../constants/constants";
import axios from "axios";

const cx = classNames.bind(styles);

const CreateMoviePage = () => {
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
    episodes: "",
  });
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [countryClicked, setCountryClicked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/create-movie`,
        {
          ...state,
        }
      );
      console.log(state.category);
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
        <h3>New Movie</h3>
        <input
          type="date"
          name="created"
          value={state.created}
          onChange={(e) => handleChangeForm("created", e)}
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={(e) => handleChangeForm("name", e)}
          placeholder="Name"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="slug"
          value={state.slug}
          onChange={(e) => handleChangeForm("slug", e)}
          placeholder="Slug"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="origin_name"
          value={state.origin_name}
          onChange={(e) => handleChangeForm("origin_name", e)}
          placeholder="Origin Name"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="content"
          value={state.content}
          onChange={(e) => handleChangeForm("content", e)}
          placeholder="Content"
          className={cx("form-input")}
          required
        />
        <select
          name="type"
          value={state.type}
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
          value={state.status}
          onChange={(e) => handleChangeForm("status", e)}
          className={cx("form-select")}
        >
          <option value="ongoing">ongoing</option>
          <option value="completed">completed</option>
        </select>
        <input
          type="text"
          name="poster_url"
          value={state.poster_url}
          onChange={(e) => handleChangeForm("poster_url", e)}
          placeholder="Poster"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="thumb_url"
          value={state.thumb_url}
          onChange={(e) => handleChangeForm("thumb_url", e)}
          placeholder="Thumbnail"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="trailer_url"
          value={state.trailer_url}
          onChange={(e) => handleChangeForm("trailer_url", e)}
          placeholder="Trailer"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="time"
          value={state.time}
          onChange={(e) => handleChangeForm("time", e)}
          placeholder="Time"
          className={cx("form-input")}
        />
        <input
          type="text"
          name="episode_current"
          value={state.episode_current}
          onChange={(e) => handleChangeForm("episode_current", e)}
          placeholder="Episode Current"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="episode_total"
          value={state.episode_total}
          onChange={(e) => handleChangeForm("episode_total", e)}
          placeholder="Episode Total"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="quality"
          value={state.quality}
          onChange={(e) => handleChangeForm("quality", e)}
          placeholder="Quality"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="lang"
          value={state.lang}
          onChange={(e) => handleChangeForm("lang", e)}
          placeholder="Lang"
          className={cx("form-input")}
          required
        />
        <select
          name="year"
          value={state.year}
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
          value={state.actor}
          onChange={(e) => handleChangeForm("actor", e)}
          placeholder="Actor"
          className={cx("form-input")}
          required
        />
        <input
          type="text"
          name="director"
          value={state.director}
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
        <input
          type="text"
          name="episodes"
          value={state.episodes}
          onChange={(e) => handleChangeForm("episodes", e)}
          placeholder="Example: Ep 1|tap-1|filename|link_embed|link_m3u8,..."
          className={cx("form-input")}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateMoviePage;