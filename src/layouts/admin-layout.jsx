import PropTypes from "prop-types";
import Header from "../components/header-admin/header-admin";
import Sidebar from "../components/sidebar/sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: "var(--black-color)" }}>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
