import React from 'react';
import logo from "./images/logo.png"
import phoneCall from "./images/phone-call.svg"
import "./header.scss"
import {Link, useNavigate} from "react-router-dom";

function Header(props) {
    const navigate = useNavigate()

    return (
        <div className={"my-header"}>
            <header className="header d-flex align-items-center ">
                <div className="header_content d-flex flex-row align-items-center">
                    {/* Logo */}
                    <Link to={"/"}>
                        <div className="logo_container">
                            <div className="logo">
                                <img src={logo} alt="logo"/>
                                <span>course</span>
                            </div>
                        </div>
                    </Link>

                    {/* Main Navigation */}
                    <nav className="main_nav_container">
                        <div className="main_nav">
                            <ul className="main_nav_list">
                                <li onClick={() => navigate("/news")} className="main_nav_item">e'lonlar</li>
                                <li onClick={() => navigate("/timetable")} className="main_nav_item">dars jadvali</li>
                                <li onClick={() => navigate("/rating")} className="main_nav_item">rating</li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="header_side d-flex flex-row justify-content-center align-items-center">
                    <img src={phoneCall} alt="phone-call"/>
                    <span>+998 999999999</span>
                </div>
                {/* Hamburger */}
                <div className="hamburger_container">
                    <i className="fas fa-bars trans_200"/>
                </div>
            </header>
        </div>
    );
}

export default Header;