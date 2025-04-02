import PropTypes from "prop-types";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./question.module.scss";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const cx = classNames.bind(styles);

const Question = ({ title, desc }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={cx("question-box")} onClick={() => setIsOpen(!isOpen)}>
        <div className={cx("question-top")}>
          <h6>{title}</h6>
          {!isOpen ? (
            <AddIcon className={cx("icon")} />
          ) : (
            <ClearIcon className={cx("icon")} />
          )}
        </div>
      </div>
      {isOpen && (
        <div className={cx("more-desc")} style={{ marginTop: -8 }}>
          {Array.from(desc).map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      )}
    </>
  );
};

Question.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

export default Question;