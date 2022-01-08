import React, { useRef } from "react";
import "../css/Hero.css";
import SearchIcon from "@material-ui/icons/Search";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

import { useHistory } from "react-router-dom";

function Hero() {
  const history = useHistory();
  const inputRef = useRef();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const search = inputRef.current.value;
    if (search) history.push(`/s/${search}`);
  };

  return (
    <div className="hero">
      <img src="./asset/PIA12348~orig.jpg" alt="" className="hero__image" />

      <div className="hero__content">
        <div className="hero__contentWrapper">
          <h1 className="hero__contentTitle">nasa</h1>
          <br />
          <h3 className="hero__contentSubtitle">
            The internet’s source of freely-usable images.
          </h3>
          <h3 className="hero__contentSubtitle">
            Powered by creators everywhere.
          </h3>
          <br />
          <form onSubmit={handleSearchSubmit} className="hero__contentInput">
            <SearchIcon className="header__icon" />
            <input
              ref={inputRef}
              type="text"
              className="hero__contentInputField"
              placeholder="Search free high-resolution photos"
            />
            <ImageSearchIcon className="header__icon" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
