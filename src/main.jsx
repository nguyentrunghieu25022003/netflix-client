import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyles from "./components/GlobalStyles";
import { MovieProvider } from "./context/movie-provider";
import { NotificationProvider } from "./components/socket/socket";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles>
      <NotificationProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </NotificationProvider>
    </GlobalStyles>
  </React.StrictMode>
);
