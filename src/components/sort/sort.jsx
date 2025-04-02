import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./sort.module.scss";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import { fetchAllCategories, fetchAllCountries } from "../../api/index";
import { useNavigate } from "react-router-dom";
import { genreObjects, countryObjects } from "../../constants/constants";

const cx = classNames.bind(styles);

const replace = (str) => {
  let result = str;
  if (str === "Genre" || str === "Country") {
    result = str;
  }
  if (str !== "Genre") {
    const genreObject = genreObjects.find((genre) => genre.key === str);
    if (genreObject) {
      result = genreObject.value;
    }
  }
  if (str !== "Country") {
    const countryObject = countryObjects.find((country) => country.key === str);
    if (countryObject) {
      result = countryObject.value;
    }
  }
  return result;
};

const Sort = ({ fetchMovies, onSortChange }) => {
  const [sortOptions, setSortOptions] = useState({
    categories: [],
    countries: [],
    sort: [
      "Name Desc",
      "Name Inc",
      "Year Desc",
      "Year Inc",
      "View Desc",
      "View Inc",
    ],
    selectedCategory: "Genre",
    selectedCountry: "Country",
    selectedSort: "Sort",
    clickCategories: false,
    clickCountries: false,
    clickSort: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      sortOptions.selectedCategory === "Genre" &&
      sortOptions.selectedCountry === "Country" &&
      sortOptions.selectedSort === "Sort"
    ) {
      return;
    }
    try {
      const data = await fetchMovies();
      let dataLength;
      if (data.movies && data.movies.length > 0) {
        dataLength = data.movies.length;
      } else if (
        data.myList &&
        data.myList.movie &&
        data.myList.movie.length > 0
      ) {
        dataLength = data.myList.movie.length;
      }
      if (dataLength > 0) {
        let queryStringified = "";
        const sortChange = {};
        if (sortOptions.selectedCategory !== "Genre") {
          queryStringified += `genre=${sortOptions.selectedCategory}&`;
          sortChange.category = sortOptions.selectedCategory;
        }
        if (sortOptions.selectedCountry !== "Country") {
          queryStringified += `country=${sortOptions.selectedCountry}&`;
          sortChange.country = sortOptions.selectedCountry;
        }
        if (sortOptions.selectedSort !== "Sort") {
          const str = sortOptions.selectedSort.split(" ");
          queryStringified += `sortKey=${str[0].toLowerCase()}&sortValue=${str[1].toLowerCase()}`;
          sortChange.sort = sortOptions.selectedSort;
        }
        if (queryStringified !== "") {
          queryStringified = "?" + queryStringified;
          onSortChange(sortChange);
          navigate(queryStringified);
        } else {
          console.log("No movies found with the current filters.");
        }
      } else {
        console.log("No movies found with the current filters.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchAllCategories()
      .then((response) => {
        const categoryNamesSet = new Set();
        Array.from(response).forEach((category) => {
          category.forEach((item) => categoryNamesSet.add(item.slug));
        });
        setSortOptions((prev) => ({
          ...prev,
          categories: Array.from(categoryNamesSet),
        }));
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetchAllCountries()
      .then((response) => {
        const countryNamesSet = new Set();
        Array.from(response).forEach((country) => {
          country.forEach((item) => countryNamesSet.add(item.slug));
        });
        setSortOptions((prev) => ({
          ...prev,
          countries: Array.from(countryNamesSet),
        }));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleToggleCategories = () => {
    setSortOptions((prev) => ({
      ...prev,
      clickCategories: !prev.clickCategories,
    }));
  };

  const handleToggleCountries = () => {
    setSortOptions((prev) => ({
      ...prev,
      clickCountries: !prev.clickCountries,
    }));
  };

  const handleToggleSort = () => {
    setSortOptions((prev) => ({
      ...prev,
      clickSort: !prev.clickSort,
    }));
  };

  const handleCategorySelection = (category) => {
    setSortOptions((prev) => ({
      ...prev,
      selectedCategory: category,
      clickCategories: false,
    }));
  };

  const handleCountrySelection = (country) => {
    setSortOptions((prev) => ({
      ...prev,
      selectedCountry: country,
      clickCountries: false,
    }));
  };

  const handleSortSelection = (sort) => {
    setSortOptions((prev) => ({
      ...prev,
      selectedSort: sort,
      clickSort: false,
    }));
  };

  return (
    <form className={cx("tools")} onSubmit={handleSubmit}>
      <div className={cx("list")}>
        <div className={cx("sort")}>
          <div className={cx("sort-select")} onClick={handleToggleCategories}>
            <strong>{replace(sortOptions.selectedCategory)}</strong>
            <ArrowDropDownIcon className={cx("icon")} />
          </div>
          {sortOptions.clickCategories && (
            <ul className={cx("sort-options")}>
              {sortOptions.categories.map((item) => (
                <li key={item} onClick={() => handleCategorySelection(item)}>
                  {replace(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cx("sort")}>
          <div className={cx("sort-select")} onClick={handleToggleCountries}>
            <strong>{replace(sortOptions.selectedCountry)}</strong>
            <ArrowDropDownIcon className={cx("icon")} />
          </div>
          {sortOptions.clickCountries && (
            <ul className={cx("sort-options")}>
              {sortOptions.countries.map((item) => (
                <li key={item} onClick={() => handleCountrySelection(item)}>
                  {replace(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={cx("sort")}>
          <div className={cx("sort-select")} onClick={handleToggleSort}>
            <strong>{sortOptions.selectedSort}</strong>
            <ArrowDropDownIcon className={cx("icon")} />
          </div>
          {sortOptions.clickSort && (
            <ul className={cx("sort-options")}>
              {sortOptions.sort.map((item) => (
                <li key={item} onClick={() => handleSortSelection(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button className={cx("btn-submit")} type="submit">
        Apply
      </button>
    </form>
  );
};

Sort.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default Sort;
