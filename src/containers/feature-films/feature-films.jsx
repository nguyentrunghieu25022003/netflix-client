import { fetchFeatureFilms } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const FeatureFilms = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchFeatureFilms} title={"All Features"} />
    </>
  );
};

export default FeatureFilms;
