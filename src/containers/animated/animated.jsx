import { fetchAnimated } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const Animated = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchAnimated} title={"All Animated"} />
    </>
  );
};

export default Animated;
