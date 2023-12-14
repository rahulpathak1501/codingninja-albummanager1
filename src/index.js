import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import AddAlbum from "./Components/AddAlbum";
import RoutComponents from "./Components/RouteComponents";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RoutComponents />
  </React.StrictMode>
);
