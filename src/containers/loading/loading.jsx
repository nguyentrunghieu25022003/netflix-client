import classNames from "classnames/bind";
import styles from "./loading.module.scss";

const cx = classNames.bind(styles);

const LoadingPage = () => {
  return (
    <div className={cx("loading-page")}>
      <img src={"/assets/imgs/Spin@1x-1.0s-200px-200px.gif"} alt="Loading" />
    </div>
  );
};

export default LoadingPage;
