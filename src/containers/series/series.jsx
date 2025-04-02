import { fetchSeries } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const Movies = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchSeries} title={"All Series"} />
    </>
  );
};

export default Movies;
