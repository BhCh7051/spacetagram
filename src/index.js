import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";

setTimeout(
    () =>
        // the show/hide functions are passed as props
        ReactDOM.render(
            <React.StrictMode>
                <App/>
            </React.StrictMode>,
            document.getElementById("root")
        ),
    6000
);
