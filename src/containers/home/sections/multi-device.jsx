import classNames from "classnames/bind";
import styles from "./multi-device.module.scss";

const cx = classNames.bind(styles);

const MultiDevice = () => {
  return (
    <div className={cx("device")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className={cx("device-left")}>
              <h2>Enjoy on your TV</h2>
              <p className="pt-3">
                Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple
                TV,Blu-ray players, and more.
              </p>
            </div>
          </div>
          <div className="col-xl-6">
            <div className={cx("device-right")}>
              <img src={"/assets/imgs/tv.png"} alt="Error" />
              <video autoPlay muted loop width={465}>
                <source
                  src={"/assets/videos/video-tv-0819.m4v"}
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

export default MultiDevice;
