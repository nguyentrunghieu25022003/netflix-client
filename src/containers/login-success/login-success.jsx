import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSuccess = () => {
  const { token, email, avatar } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLoginSuccess = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST_URL}/login-success/${token}/${email}/${avatar}`
        );
        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: email,
              avatar: avatar,
            })
          );
          window.location.href = "/";
        } else {
          navigate("/auth/login");
        }
      } catch (err) {
        console.error(err);
      }
    };
    handleLoginSuccess();
  }, [token, email, avatar, navigate]);

  return null;
};

export default LoginSuccess;