import PropTypes from "prop-types";
import Footer from "../components/footer/footer";

const LoginLayout = ({ children }) => {
  return (
    <>
      <>{children}</>
      <Footer />
    </>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginLayout;
