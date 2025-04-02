import PropTypes from "prop-types";
import Header from "../components/header-only/header";
import Footer from "../components/footer-only/footer";
import Ranking from "../components/ranking/ranking";
import Thank from "../components/thank/thank";
import { fetchAllThumbnails } from "../api/index";
import { useEffect, useState } from "react";
import ImageSlider from "../components/slider/slider";

const MoviesLayout = ({ children }) => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    const handleFetchAllThumbnails = async () => {
      try {
        const response = await fetchAllThumbnails();
        const movies = response.map((item) => ({
          thumbUrl: item.movie.thumb_url,
          slug: item.movie.slug,
          name: item.movie.origin_name,
          year: item.movie.year,
          quality: item.movie.quality,
          lang: item.movie.lang,
          content: item.movie.content,
          video: item.movie.trailer_url,
          type: item.movie.type,
        }));
        setSlider(movies);
      } catch (err) {
        console.error(err);
      }
    };
    handleFetchAllThumbnails();
  }, []);

  return (
    <>
      <Header />
      <ImageSlider images={slider} />
      <>{children}</>
      <Ranking />
      <Thank />
      <Footer />
    </>
  );
};

MoviesLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MoviesLayout;
