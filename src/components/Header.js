import React, {useEffect, useRef, useState} from "react";
import "../css/Header.css";
import Catergories from "./Categories";
import {Avatar, Button} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";

import {useHistory, useLocation} from "react-router-dom";

function Header() {
    const history = useHistory();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showCategories, setShowCategories] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        if (location.pathname === "/") setShowCategories(true);
    }, [location.pathname]);

    useEffect(() => {
        let unlisten = history.listen((location, action) => {
            if (location.pathname === "/") {
                inputRef.current.value = "";
                setShowCategories(true);
            }

            const tempArray = location.pathname.split("s/");
            if (tempArray.length === 2) {
                inputRef.current.value = tempArray[1];
                setShowCategories(false);
            }
        });
        return unlisten;
    }, [history]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const search = inputRef.current.value;
        if (search) history.push(`/s/${search}`);
    };

    const handleOpen = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(false);

    const goToHomePage = () => history.push("/");

    return (
        <div className={`header__wrapper ${!showCategories && "border-bottom"}`}>
            <div className="header">
                <img
                    onClick={goToHomePage}
                    src="./asset/android-chrome-512x512.png"
                    alt=""
                    className="header__Logo"
                />

                <form onSubmit={handleSearchSubmit} className="header__input">
                    <SearchIcon className="header__icon"/>
                    <input
                        ref={inputRef}
                        type="text"
                        className="header__inputField"
                        placeholder="Search Nasa images"
                    />
                    <ImageSearchIcon className="header__icon"/>
                </form>

                <div className="header__right">
                    <div className="header__rightButtonWrapper">
                        <Button
                            onClick={goToHomePage}
                            size="small"
                            className="header__rightButton"
                        >
                            Home
                        </Button>

                    </div>
                    <Avatar className="header__rightAvatar"/>
                </div>
            </div>

            {/* Show Catergories only in Home page */}
            {showCategories && <Catergories/>}
        </div>
    );
}

export default Header;
