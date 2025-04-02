import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [userToken, setUserToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth/refresh-token`, {
        withCredentials: true
      });
      if (response.status === 200) {
        console.log("Access token updated!");
        setUserToken(true);
        setIsLoading(false);
      } else {
        console.error("Refresh token invalid or expired.");
        localStorage.removeItem("user");
        setUserToken(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      setUserToken(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/auth/check-token`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserToken(true);
          setIsLoading(false);
        } else {
          console.log("Access token invalid, attempting to refresh.");
          await refreshAccessToken();
        }
      } catch (error) {
        console.error("Error checking access token:", error);
        await refreshAccessToken();
      }
    };

    checkAuthToken();
  }, []);

  return { userToken, isLoading };
};

export default useAuth;