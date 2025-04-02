import { fetchAllMovies } from "../../api/index";
import MoviesPage from "../../components/movies/movies";

const AllMovies = () => {
  return (
    <>
      <MoviesPage fetchAllMovies={fetchAllMovies} title={"All Movies"} />
    </>
  );
};

export default AllMovies;