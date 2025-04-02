import PropTypes from "prop-types";
import { createContext, useState, useContext } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesSearch, setTotalPagesSearch] = useState(1);
  const value = {
    movies,
    setMovies,
    currentPage,
    setCurrentPage,
    totalPagesSearch,
    setTotalPagesSearch,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => {
  return useContext(MovieContext);
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};