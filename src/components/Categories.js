import React from "react";
import "../css/Catergories.css";
import {Link} from "react-router-dom";

function Categories() {
    return (
        <div className="categories">
            <Link to="/" className="categories__item categories__item--active">
                APOD
            </Link>
            <Link to="/s/nasa" className="categories__item">
                NASA
            </Link>

            <div className="categories__breaker"></div>

            <div className="categories__list">
                <Link to="/s/earth" className="categories__item">
                    Earth
                </Link>
                <Link to="/s/moon" className="categories__item">
                    Moon
                </Link>
                <Link to="/s/sun" className="categories__item">
                    Sun
                </Link>
                <Link to="/s/mars" className="categories__item">
                    Mars
                </Link>
                <Link to="/s/supermoon" className="categories__item">
                    Supermoon
                </Link>
                <Link to="/s/Jupiter" className="categories__item">
                    Jupiter
                </Link>
                <Link to="/s/Venus" className="categories__item">
                    Venus
                </Link>
                <Link to="/s/fashion" className="categories__item">
                    Fashion
                </Link>
                <Link to="/s/ISS" className="categories__item">
                    ISS
                </Link>
                <Link to="/s/Venus" className="categories__item">
                    Venus
                </Link>
                <Link to="/s/technology" className="categories__item">
                    Technology
                </Link>
                <Link to="/s/ISRO" className="categories__item">
                    ISRO
                </Link>
                <Link to="/s/SpaceX" className="categories__item">
                    SpaceX{" "}
                </Link>
                <Link to="/s/Uranus" className="categories__item">
                    Uranus
                </Link>
                <Link to="/s/Neptune" className="categories__item">
                    Neptune{" "}
                </Link>
                <Link to="/s/history" className="categories__item">
                    History
                </Link>
            </div>
        </div>
    );
}

export default Categories;
