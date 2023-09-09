import React from 'react';

import {Link, useNavigate} from "react-router-dom";
import './style.css'

import Header from "../header/header";
import '../home/home.scss'

function NewsHome(props) {
    const navigate = useNavigate();
    return (

        <div className={'my-home'}>
            <Header/>

            <div className="home">
                {/* Hero Slider */}
                <div className="hero_slider_container">
                    <div className="hero_slider owl-carousel">
                        {/* Hero Slide */}
                        <div className="hero_slide">
                            <div className="hero_slide_background"></div>
                            <div
                                className="hero_slide_container d-flex flex-column align-items-center justify-content-center">
                                <div className="hero_slide_content text-center">
                                    <h1 data-animation-in="fadeInUp" data-animation-out="animate-out fadeOut">
                                        <span>E'lonlar</span></h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero_boxes">
                <div className="hero_boxes_inner">
                    <div className="container">
                        <div className="row">

                            <Link to={'/news/teachers'} className="col-lg-6 hero_box_col">
                                <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">Ustozlar uchun</h2>
                                    </div>
                                </div>
                            </Link>

                            <Link to={'/news/students'} className="col-lg-6 hero_box_col ">
                                <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">O'quvchilar uchun</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsHome;
