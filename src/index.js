import React from "react";
import ReactDOM from "react-dom";
import {usePromiseTracker} from "react-promise-tracker";
import "./css/index.css";
import App from "./App";
import ContentLoader from "react-content-loader";

const loader = document.querySelector(".loader");

const hideLoader = () => {
    setTimeout(() => {
        loader.classList.add("loader--hide");
        const container = document.querySelector(".app--container");
        container.classList.remove("app--hide");
    }, 2000);
};
const LoadingIndicator = (props) => {
    const {promiseInProgress} = usePromiseTracker();
    return (
        promiseInProgress && (
            <ContentLoader
                viewBox="0 0 820 450"
                height={450}
                width={820}
                speed={2}
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="10" y="10" rx="5" ry="5" width="260" height="140"/>
                <rect x="280" y="10" rx="5" ry="5" width="260" height="280"/>
                <rect x="550" y="10" rx="5" ry="5" width="260" height="140"/>
                <rect x="10" y="160" rx="5" ry="5" width="260" height="280"/>
                <rect x="280" y="300" rx="5" ry="5" width="260" height="140"/>
                <rect x="550" y="160" rx="5" ry="5" width="260" height="280"/>
            </ContentLoader>
        )
    );
};

ReactDOM.render(
    <React.StrictMode>
        <div className="app--container app--hide">
            <App hideLoader={hideLoader}/>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
);
