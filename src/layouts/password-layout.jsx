import PropTypes from "prop-types";
import Header from "../components/header-forgot-page/header";
import Footer from "../components/footer-only/footer";

const ForgotPasswordLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <>{children}</>
      <Footer />
    </div>
  );
};

ForgotPasswordLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ForgotPasswordLayout;
