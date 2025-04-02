import classNames from "classnames/bind";
import styles from "./multi-use.module.scss";

const cx = classNames.bind(styles);

const MultiUse = () => {
  return (
    <div className={cx("multi-use")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className={cx("multi-use-left")}>
              <h2>Watch everywhere</h2>
              <p className="pt-3">
                Stream unlimited movies and TV shows on your phone,
                tablet,laptop, and TV.
              </p>
            </div>
          </div>
          <div className="col-xl-6">
            <div className={cx("multi-use-right")}>
              <img src={"/assets/imgs/device-pile-vn.png"} alt="Error" />
              <video autoPlay muted loop width={400}>
                <source
                  src={"/assets/videos/video-devices-vn.m4v"}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiUse;
