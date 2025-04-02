import classNames from "classnames/bind";
import styles from "./dashboard.module.scss";
import { getDashboard } from "../../api/index";
import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MovieIcon from "@mui/icons-material/Movie";
import CommentIcon from "@mui/icons-material/Comment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ChartComponent from "../../components/chart/chart";

const cx = classNames.bind(styles);

const Dashboard = () => {
  const [state, setState] = useState({
    totalUsers: 0,
    totalMovies: 0,
    totalComments: 0,
    totalViews: 0,
  });

  useEffect(() => {
    const adminDashboard = async () => {
      const response = await getDashboard();
      setState({
        totalUsers: response.totalUsers,
        totalMovies: response.totalMovies,
        totalComments: response.totalComments,
        totalViews: response.totalViews,
      });
    };
    adminDashboard();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("heading")}>Dashboard</h3>
      <div className={cx("dashboard")}>
        <div className={cx("dashboard-item")}>
          <PersonIcon className={cx("icon")} />
          <strong>{state.totalUsers}</strong>
          <b>Users</b>
        </div>
        <div className={cx("dashboard-item")}>
          <MovieIcon className={cx("icon")} />
          <strong>{state.totalMovies}</strong>
          <b>Movies</b>
        </div>
        <div className={cx("dashboard-item")}>
          <CommentIcon className={cx("icon")} />
          <strong>{state.totalComments}</strong>
          <b>Comments</b>
        </div>
        <div className={cx("dashboard-item")}>
          <RemoveRedEyeIcon className={cx("icon")} />
          <strong>{state.totalViews}</strong>
          <b>Views</b>
        </div>
      </div>
      <div className={cx("chart")}>
        <ChartComponent
          totalUsers={state.totalUsers}
          totalMovies={state.totalMovies}
          totalComments={state.totalComments}
          totalViews={state.totalViews}
        />
      </div>
    </div>
  );
};

export default Dashboard;