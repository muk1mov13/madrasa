import React from 'react';
import "./home.scss"
import Header from "Components/header/header";
import '../News/style.css'
import rasm1 from "./images/earth-globe.svg";
import rasm2 from "./images/books.svg";
import rasm3 from "./images/professor.svg";
import {Link} from 'react-router-dom'

function Home(props) {
    return (
        <div className={"my-home"}>
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
                                    <h1 data-animation-in="fadeInUp" data-animation-out="animate-out fadeOut">Get
                                        your <span>Education</span> today!</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*// three onclick button*/}

            <div className="hero_boxes">
                <div className="hero_boxes_inner">
                    <div className="container">
                        <div className="row">
                            <Link to={'/news'} className="col-lg-4 hero_box_col">
                                <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                    <img src={rasm1} className="svg" alt=""/>
                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">E'lonlar</h2>
                                        <p className="hero_box_link">view more</p>
                                    </div>
                                </div>
                            </Link>

                            <Link to={'/timetable'} className="col-lg-4 hero_box_col ">
                                <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                    <img src={rasm2} className="svg" alt=""/>
                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">Dars jadval</h2>
                                        <p className="hero_box_link">view more</p>
                                    </div>
                                </div>
                            </Link>

                            <Link to={'/rating'} className="col-lg-4 hero_box_col">
                                <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                    <img src={rasm3} className="svg" alt=""/>
                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">Rating</h2>
                                        <p className="hero_box_link">view more</p>
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

export default Home;