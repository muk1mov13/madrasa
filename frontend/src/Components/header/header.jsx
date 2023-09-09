import React from 'react';
import logo from "./images/logo.png"
import phoneCall from "./images/phone-call.svg"
import "./header.scss"

function Header(props) {
    return (
        <div className={"my-header"}>
            <header className="header d-flex align-items-center ">
                <div className="header_content d-flex flex-row align-items-center">
                    {/* Logo */}
                    <div className="logo_container">
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                            <span>course</span>
                        </div>
                    </div>

                    {/* Main Navigation */}
                    <nav className="main_nav_container">
                        <div className="main_nav">
                            <ul className="main_nav_list">
                                <li className="main_nav_item">home</li>
                                <li className="main_nav_item">about us</li>
                                <li className="main_nav_item">courses</li>
                                <li className="main_nav_item">elements</li>
                                <li className="main_nav_item">news</li>
                                <li className="main_nav_item">contact</li>
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