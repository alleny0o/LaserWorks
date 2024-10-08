import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/Global.scss";
import { Provider } from "react-redux";
import store from "./redux/store";

import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
