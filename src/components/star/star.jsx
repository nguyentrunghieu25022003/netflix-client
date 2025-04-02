import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";

const StarRating = ({ rating, totalStars }) => {
  if (rating === 0) {
    return (
      <div>
        {Array.from({ length: 10 }, (_, index) => (
          <StarBorderIcon
            key={index}
            style={{ color: "gold", fontSize: "20px" }}
          />
        ))}
      </div>
    );
  }

  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStars;

  return (
    <div>
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <StarIcon key={index} style={{ color: "gold", fontSize: "20px" }} />
        ))}
      {Array(halfStars)
        .fill()
        .map((_, index) => (
          <StarHalfIcon
            key={index}
            style={{ color: "gold", fontSize: "20px" }}
          />
        ))}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <StarBorderIcon
            key={index}
            style={{ color: "gold", fontSize: "20px" }}
          />
        ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  totalStars: PropTypes.number.isRequired,
};

export default StarRating;