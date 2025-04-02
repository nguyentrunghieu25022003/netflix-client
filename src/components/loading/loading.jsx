import classNames from "classnames/bind";
import styles from "./loading.module.scss";

const cx = classNames.bind(styles);

const Loading = () => {
   return (
    <div className={cx("loading")}>
        <img src={"/assets/imgs/Spin@1x-1.0s-200px-200px.gif"} alt="Loading" />
    </div>
   ); 
};

export default Loading;