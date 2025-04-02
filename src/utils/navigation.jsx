import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HandleReloading = () => {
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname + location.search;
    const lastPath = sessionStorage.getItem("lastPath");
    if (!lastPath || (lastPath && lastPath !== currentPath)) {
      sessionStorage.setItem("lastPath", currentPath);
    }
  }, [location]);
  return null;
};

export default HandleReloading;