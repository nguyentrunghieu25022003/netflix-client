import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import { fetchAllNotifications } from "../../api/index";

const SOCKET_URL = import.meta.env.VITE_SERVER_URL;
const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const options = {
    withCredentials: true
  };

  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to the server!");
    });

    socket.on("movieAdded", async (data) => {
      console.log(data.message);
      try {
        const response = await fetchAllNotifications(options);
        setNotifications(response.messages);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    });

    const fetchNotifications = async () => {
      try {
        const response = await fetchAllNotifications(options);
        setNotifications(response.messages);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();

    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};