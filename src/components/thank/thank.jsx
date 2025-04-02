import classNames from "classnames/bind";
import styles from "./thank.module.scss";

const cx = classNames.bind(styles);

const Thank = () => {
  return (
    <div className={cx("thank")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h4>Thank you for&nbsp;choosing Fakeflix</h4>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-xl-6 col-lg-6 col-md-12 col-12">
            <img src={"/assets/imgs/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f54683357616c6c2f6173736574732d63646e2f46616b65666c69782f46616b65666c69785f726561646d652e706e67.png"} alt="error" />
          </div>
          <div className={cx("col-xl-6 desc")}>
            <p>
              We provide free and high quality movie watching services for you.
              We appreciate your ability to choose us and hope our services have
              been helpful.
            </p>
            <p>
              As a new website, we rely on your support to grow, so please help
              us by sharing our site with your friends and colleagues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thank;
