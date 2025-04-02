import classNames from "classnames/bind";
import styles from "./kid-content.module.scss";

const cx = classNames.bind(styles);

const KidContent = () => {
  return (
    <div className={cx("kid-content")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className={cx("kid-content-left")}>
              <img
                src={
                  "/assets/imgs/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png"
                }
                alt="Error"
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className={cx("kid-content-right")}>
              <h2>Create profiles for kids</h2>
              <p className="pt-3">
                Send kids on adventures with their favorite <br /> characters in
                a space made just for them—free with your membership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidContent;
