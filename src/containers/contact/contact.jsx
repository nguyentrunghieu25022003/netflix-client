import classNames from "classnames/bind";
import styles from "./contact.module.scss";
import PlaceIcon from "@mui/icons-material/Place";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TelegramIcon from "@mui/icons-material/Telegram";
import PublicIcon from "@mui/icons-material/Public";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

const Contact = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    subject: "",
    text: "",
    submit: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        name: state.name,
        email: state.email,
        subject: state.subject,
        text: state.text,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/contact/send`,
        formData
      );
      if (response.status === 200) {
        setState((prev) => ({ ...prev, submit: true }));
        setTimeout(() => {
          setState((prev) => ({ ...prev, submit: false }));
        }, 5000);
      }
    } catch (error) {
      console.error("Failed ", error);
    }
  };

  const handleNameChange = (event) => {
    setState((prev) => ({ ...prev, name: event.target.value }));
  };

  const handleEmailChange = (event) => {
    setState((prev) => ({ ...prev, email: event.target.value }));
  };

  const handleSubjectChange = (event) => {
    setState((prev) => ({ ...prev, subject: event.target.value }));
  };

  const handleTextChange = (event) => {
    setState((prev) => ({ ...prev, text: event.target.value }));
  };

  return (
    <div className={cx("contact")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <form
              className={cx("form-contact")}
              onSubmit={handleSubmit}
              method="POST"
            >
              <h5>Contact us</h5>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name
                </label>
                <input
                  name="name"
                  value={state.name}
                  onChange={(e) => handleNameChange(e)}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Example: Ams Ssa"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput2"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  name="email"
                  value={state.email}
                  onChange={(e) => handleEmailChange(e)}
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Example: xxx@gmail.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput3"
                  className="form-label"
                >
                  Subject
                </label>
                <input
                  name="subject"
                  value={state.subject}
                  onChange={(e) => handleSubjectChange(e)}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="Example: Support Me"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Message
                </label>
                <textarea
                  name="text"
                  value={state.text}
                  onChange={(e) => handleTextChange(e)}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Example: xxxxx"
                  required
                ></textarea>
              </div>
              <button type="submit">Send</button>
            </form>
            {state.submit && (
              <div className={cx("form-alert")}>
                <CheckCircleOutlineIcon className={cx("icon")} />
                <strong>Submitted successfully</strong>
              </div>
            )}
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
            <div className={cx("contact-information")}>
              <h5>Contact information</h5>
              <p>
                We re open or any suggestion orust to hdve aht1gaz1dBNY1|&This
                text was recognized by the built-in Ocrad engine. A better
                transcription may be attained by right clicking on the selection
                and changing the OCR engine to Tesseract (under the Language
                menu). This message can be removed in the future by unchecking
                OCR Disclaimer (under the Options menu). More info:
                http://projectnaptha.com/ocrad
              </p>
              <div className={cx("contact-item")}>
                <PlaceIcon className={cx("icon")} />
                <p>
                  <strong>Address: </strong>A 123 California, United States
                </p>
              </div>
              <div className={cx("contact-item")}>
                <LocalPhoneIcon className={cx("icon")} />
                <p>
                  <strong>Phone: </strong>+ 1235 2355 98
                </p>
              </div>
              <div className={cx("contact-item")}>
                <TelegramIcon className={cx("icon")} />
                <p>
                  <strong>Email: </strong>admin@gmail.com
                </p>
              </div>
              <div className={cx("contact-item")}>
                <PublicIcon className={cx("icon")} />
                <p>
                  <strong>Website: </strong>www.netflix.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;