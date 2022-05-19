import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.scss";
import { WeEnjoyMangaApp } from "./WeEnjoyMangaApp";
import { ChakraProvider } from "@chakra-ui/react";
import { customeTheme } from "./chakraTheme/customTheme";


ReactDOM.render(
  <React.StrictMode>
      <WeEnjoyMangaApp />
  </React.StrictMode>,
  document.getElementById("root")
);
