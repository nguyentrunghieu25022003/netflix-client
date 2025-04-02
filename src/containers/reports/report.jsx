import classNames from "classnames/bind";
import styles from "./report.module.scss";
import { fetchAllReport } from "../../api/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const Report = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const getAllReport = async () => {
      const response = await fetchAllReport();
      setReports(response);
    };
    getAllReport();
  }, []);

  return (
    <div className={cx("report")}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>Report</h3>
          </div>
          <div className="row">
            {reports.map((report) => {
              const date = new Date(report.createAt);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              };
              const formattedDate = date.toLocaleDateString("en-US", options);
              return (
                <div key={report._id} className="col-12 mt-3">
                  <div className={cx("report-item")}>
                    <h5>{report.fileName}</h5>
                    <div className="d-flex align-items-center justify-content-between">
                      <strong>URL: </strong>
                      <Link to={report.videoUrl} target="blank">
                        {report.videoUrl}
                      </Link>
                      <Link
                        className={cx("check-link")}
                        to={`/admin/movies/edit/${report.movieId}`}
                      >
                        Check
                      </Link>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-5">
                      <form className={cx("form-process")}>
                        <button>
                          {report.processingStatus ? "Success" : "Pending"}
                        </button>
                      </form>
                      <p>Create at: {formattedDate}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
