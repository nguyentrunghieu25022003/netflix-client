import PropTypes from "prop-types";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Hero from "../containers/home/sections/hero";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url("/assets/imgs/VN-en-20240422-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
          objectFit: "cover",
          minHeight: "700px",
          backgroundPosition: "center center",
        }}
      >
        <Header />
        <Hero />
      </div>
      <>{children}</>
      <Footer />
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
