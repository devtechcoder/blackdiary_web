import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./assets/styles/main.css";
import { HelmetProvider } from "react-helmet-async";
dayjs.extend(relativeTime);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
