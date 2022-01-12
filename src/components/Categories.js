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
        <Link to="/s/Business" className="categories__item">
          Busines
        </Link>
        <Link to="/s/Experimental" className="categories__item">
          Experimental
        </Link>
        <Link to="/s/fashion" className="categories__item">
          Fashion
        </Link>
        <Link to="/s/film" className="categories__item">
          Film
        </Link>
        <Link to="/s/health" className="categories__item">
          Health
        </Link>
        <Link to="/s/technology" className="categories__item">
          Technology
        </Link>
        <Link to="/s/travel" className="categories__item">
          Travel
        </Link>
        <Link to="/s/textures" className="categories__item">
          Textures{" "}
        </Link>
        <Link to="/s/animals" className="categories__item">
          Animals
        </Link>
        <Link to="/s/food" className="categories__item">
          Food{" "}
        </Link>
        <Link to="/s/athletics" className="categories__item">
          Athletics
        </Link>
        <Link to="/s/spirituality" className="categories__item">
          Spirituality
        </Link>
        <Link to="/s/arts" className="categories__item">
          Arts
        </Link>
        <Link to="/s/history" className="categories__item">
          History
        </Link>
      </div>
    </div>
  );
}

export default Categories;
