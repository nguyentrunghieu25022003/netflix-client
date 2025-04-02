import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { detailFilm } from "../../api/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./detail.module.scss";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Star from "../../components/star/star";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNotifications } from "../../components/socket/socket";
import { fetchAllNotifications } from "../../api/index";
import Loading from "../../components/loading/loading";
import ReportIcon from "@mui/icons-material/Report";
import { genreObjects, countryObjects } from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

const Detail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setNotifications } = useNotifications();
  const [movieData, setMovieData] = useState({
    videoUrl: "",
    episodes: [],
    movie: {},
    fileName: "",
    views: 0,
    categories: [],
    countries: [],
    comments: [],
    commentValue: "",
    idComment: "",
    userEmail: "",
    status: "",
    totalScore: 0,
    isMyList: false,
  });
  const [displayedComments, setDisplayedComments] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const episodeContainerRef = useRef(null);
  const options = {
    withCredentials: true,
  };
  const userFromStorage = localStorage.getItem("user");
  const userObject = JSON.parse(userFromStorage);
  const email = userObject.email;
  const avatarUrl = userObject.avatar;
  const totalStars = 10;

  const handleCheckImageUrl = (avatarUrl) => {
    if (avatarUrl.startsWith("https")) {
      return true;
    }
    return false;
  };

  const fetchMovieData = async () => {
    try {
      const response = await detailFilm(slug, options);
      const movie = response.detail.movie;
      const episodes = response.detail.episodes[0].server_data;
      const comments = response.comments;
      const user = response.user;
      const status = response.movieStatus;
      const totalScore = response.score?.totalScore ?? 0;
      const voteQuantity = response.score?.voteQuantity ?? 0;
      const myList = response.isMyList;
      let totalScoreCalculator = 0;
      if (voteQuantity !== 0) {
        totalScoreCalculator = Number.parseFloat(totalScore / voteQuantity);
      }
      const currentIndexData = JSON.parse(
        localStorage.getItem("currentIndexData")
      );
      if (currentIndexData && currentIndexData.key === slug) {
        setCurrentIndex(currentIndexData.currentIndex);
      } else {
        setCurrentIndex(1);
        localStorage.setItem(
          "currentIndexData",
          JSON.stringify({ key: slug, currentIndex: 1 })
        );
      }
      setMovieData({
        videoUrl: episodes[currentIndexData.currentIndex - 1].link_embed,
        episodes,
        movie,
        fileName: episodes[currentIndexData.currentIndex - 1].filename,
        views: movie.view,
        categories: movie.category,
        countries: movie.country,
        comments,
        userEmail: user,
        status: status,
        totalScore: totalScoreCalculator,
        isMyList: myList,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const currentIndexData = JSON.parse(
      localStorage.getItem("currentIndexData")
    );
    if (currentIndexData && currentIndexData.key === slug) {
      setCurrentIndex(currentIndexData.currentIndex);
    } else {
      setCurrentIndex(1);
      localStorage.setItem(
        "currentIndexData",
        JSON.stringify({ key: slug, currentIndex: 1 })
      );
    }
    fetchMovieData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleEpisode = useCallback(
    async (episodeIndex, fileName, linkEmbed) => {
      let newIndex;
      if (episodeIndex === "full") {
        newIndex = "full";
      } else {
        newIndex = episodeIndex + 1;
      }
      navigate(`/movie/detail/${slug}/tap-${newIndex}`);
      setCurrentIndex(newIndex);
      localStorage.setItem(
        "currentIndexData",
        JSON.stringify({ key: slug, currentIndex: newIndex })
      );
      if (linkEmbed !== movieData.videoUrl) {
        setMovieData((prev) => ({
          ...prev,
          fileName,
          videoUrl: linkEmbed,
        }));
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users/history/update`,
          {
            movieId: movieData.movie._id,
            episode: newIndex,
          },
          options
        );

        if (response.status === 200) {
          console.log("History saved successfully.");
        }
      } catch (error) {
        console.error("Failed to save history:", error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate, movieData, slug]
  );

  const handleConvert = (episode) => {
    let newEpisode = "";
    if (episode.includes("Tập")) {
      newEpisode = "Ep";
      newEpisode += episode.substring(3, episode.length);
    } else if (episode.includes("Full")) {
      newEpisode = episode;
    }
    return newEpisode;
  };

  const episodeList = useMemo(
    () =>
      movieData.episodes.map((episode, index) => {
        const isActive = index === currentIndex - 1;
        return (
          <div
            key={index}
            className={cx({
              episode: true,
              active: isActive,
            })}
            onClick={() =>
              handleEpisode(index, episode.filename, episode.link_embed)
            }
          >
            <p>{handleConvert(episode.name)}</p>
          </div>
        );
      }),
    [movieData.episodes, handleEpisode, currentIndex]
  );

  const handleScroll = (direction) => {
    if (episodeContainerRef.current) {
      const container = episodeContainerRef.current;
      const scrollAmount =
        direction === "left"
          ? -container.clientWidth / 2
          : container.clientWidth / 2;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const commentForm = {
        userEmail: email,
        movieSlug: slug,
        text: movieData.commentValue,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/movies/detail/${slug}/comment/create`,
        commentForm
      );
      console.log(response);
      await fetchMovieData();
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  };

  const handleDeleteComment = async (event, commentId) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/movies/detail/${slug}/comment/${commentId}`
      );
      if (response.status === 200) {
        await fetchMovieData();
      }
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  };

  const handleAddMyList = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        userEmail: email,
        movieSlug: slug,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/movies/my-list/add/${slug}`,
        formData,
        options
      );
      if (response.status === 200) {
        setMovieData((prev) => ({ ...prev, isMyList: !prev.isMyList }));
        const notificationsResponse = await fetchAllNotifications(options);
        setNotifications(notificationsResponse.messages);
      }
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  };

  const handleRating = async (newStatus) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/movies/detail/${slug}/status-video`,
        {
          userEmail: email,
          ratingValue: newStatus,
        }
      );
      if (response.status === 200) {
        setMovieData((prev) => ({ ...prev, status: newStatus }));
        await fetchMovieData();
        const notificationsResponse = await fetchAllNotifications(options);
        setNotifications(notificationsResponse.messages);
      }
    } catch (error) {
      console.error("Registration error:", error.response);
    }
  };

  const handleReport = async (event) => {
    event.preventDefault();
    try {
      const movieId = document.querySelector("input[name='movieId']").value;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/report/send`,
        {
          movieId: movieId,
          fileName: movieData.fileName,
          videoUrl: movieData.videoUrl,
        }
      );
      if (response.status === 200) {
        setIsReported(true);
        toast.success(<strong className="fs-3">Response successful</strong>, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Success");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const replace = (mySlug) => {
    let myString = "";
    const genreObject = genreObjects.find((genre) => genre.key === mySlug);
    const countryObject = countryObjects.find((country) => country.key === mySlug);
    if (genreObject) {
      myString = genreObject.value;
    }
    if (countryObject) {
      myString = countryObject.value;
    }
    return myString;
  };

  const handleImgError = (event) => {
    event.target.src = avatarUrl;
  };

  const handleLiked = () => {
    handleRating("liked");
  };

  const handleDisliked = () => {
    handleRating("disliked");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={cx("detail")}>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <h3>{movieData.fileName}</h3>
            <div className="video-player">
              {movieData.videoUrl && (
                <iframe
                  src={movieData.videoUrl}
                  width="100%"
                  height="500"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className={cx("detail-more")}>
              <p>{movieData.movie.year}</p>
              <span>|</span>
              <p>
                {movieData.movie.episode_total} <strong>Episodes</strong>
              </p>
              <span>|</span>
              <strong className={cx("views")}>
                <RemoveRedEyeIcon className={cx("view-icon")} />{" "}
                {movieData.views}
              </strong>
              <form className={cx("form-add-list")} onSubmit={handleAddMyList}>
                <input type="hidden" name="movieSlug" value={slug} />
                <button type="submit">
                  <LibraryAddIcon
                    className={
                      movieData.isMyList
                        ? cx("add-icon-active")
                        : cx("add-icon")
                    }
                  />
                </button>
              </form>
              <div className={cx("rating-box")}>
                <strong>Do you like this video?</strong>
                <div className="d-flex gap-4">
                  <input type="hidden" name="userEmail" value={email} />
                  <button type="button" onClick={handleLiked}>
                    <ThumbUpIcon
                      className={cx("rating-icon")}
                      style={
                        movieData.status === "liked"
                          ? { color: "var(--white-color)" }
                          : {}
                      }
                    />
                  </button>
                  <button type="button" onClick={handleDisliked}>
                    <ThumbDownIcon
                      className={cx("rating-icon")}
                      style={
                        movieData.status === "disliked"
                          ? { color: "var(--white-color)" }
                          : {}
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("total-score")}>
              <Star rating={movieData.totalScore} totalStars={totalStars} />
              <strong>
                {movieData.totalScore === 0
                  ? "(No reviews)"
                  : `(${Math.round(movieData.totalScore * 100) / 100} score)`}
              </strong>
            </div>
            <div className={cx("categories")}>
              <span>Genre: </span>
              {movieData.categories.map((item) => (
                <Link
                  key={item.id}
                  to={`/?genre=${encodeURIComponent(item.slug)}`}
                >
                  <strong>{replace(item.slug)}</strong>
                </Link>
              ))}
            </div>
            <div className={cx("countries")}>
              <span>Country: </span>
              {movieData.countries.map((item) => (
                <Link
                  key={item.id}
                  to={`/?country=${encodeURIComponent(item.slug)}`}
                >
                  <strong>{replace(item.slug)}</strong>
                </Link>
              ))}
            </div>
            <p className={cx("detail-desc")}>{movieData.movie.content}</p>
            <form className={cx("form-report")} onSubmit={handleReport}>
              <ReportIcon className={cx("report-icon")} />
              <strong>If the movie is defective, please report it to us</strong>
              <input type="hidden" name="movieId" value={movieData.movie._id} />
              <button type="submit" disabled={isReported}>
                Report
              </button>
            </form>
            <h4 className={cx("episodes-title")}>Episodes</h4>
            <div className={cx("episodes")}>
              {movieData.episodes.length > 14 && (
                <ChevronLeftIcon
                  className={cx("icon")}
                  onClick={() => handleScroll("left")}
                />
              )}
              <div
                className={cx("episode-container")}
                ref={episodeContainerRef}
              >
                {episodeList}
              </div>
              {movieData.episodes.length > 14 && (
                <ChevronRightIcon
                  className={cx("icon")}
                  onClick={() => handleScroll("right")}
                />
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className={cx("comments")}>
              <h4>Comments</h4>
              <form className={cx("user")} onSubmit={handleSubmitComment}>
                <div className={cx("comment")}>
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}${avatarUrl}`}
                    alt="Avatar"
                    onError={handleImgError}
                  />
                  <textarea
                    className={cx("text")}
                    value={movieData.commentValue}
                    name="text"
                    placeholder="Post a comment..."
                    rows={7}
                    onChange={(e) =>
                      setMovieData((prev) => ({
                        ...prev,
                        commentValue: e.target.value,
                      }))
                    }
                  ></textarea>
                </div>
                <div className={cx("btn-group")}>
                  <button className={cx("cancel")}>Cancel</button>
                  <button type="submit" className={cx("submit")}>
                    Submit
                  </button>
                </div>
              </form>
              <div className={cx("list")}>
                {movieData.comments.slice(0, displayedComments).map((comment) => {
                    const date = new Date(comment.createdAt);
                    const options = {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    };
                    const formattedDate = date.toLocaleDateString(
                      "en-US",
                      options
                    );
                    return (
                      <form
                        key={comment.userId}
                        className={cx("item")}
                        onSubmit={(event) =>
                          handleDeleteComment(event, comment._id)
                        }
                      >
                        <div className={cx("comment-item")}>
                          <LazyLoadImage
                            src={ handleCheckImageUrl(comment.avatarUrl) ? comment.avatarUrl : `${import.meta.env.VITE_SERVER_URL}${comment.avatarUrl}`}
                            alt="Avatar"
                            effect="blur"
                          />
                          <textarea
                            className={cx("text")}
                            value={comment.text}
                            disabled
                            rows={7}
                          ></textarea>
                        </div>
                        <span className={cx("comment-date")}>
                          {formattedDate}
                        </span>
                        {movieData.userEmail === email && (
                          <div className={cx("btn-group")}>
                            <button>Edit</button>
                            <button type="submit">Delete</button>
                          </div>
                        )}
                      </form>
                    );
                  })}
              </div>
              {movieData.comments.length > 3 && (
                <button
                  className={cx("btn-more")}
                  style={displayedComments > 3 ? { display: "none" } : {}}
                  onClick={() =>
                    setDisplayedComments(movieData.comments.length)
                  }
                >
                  More
                </button>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Detail;