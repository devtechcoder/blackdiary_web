import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.jsx";
dayjs.extend(relativeTime);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
);
