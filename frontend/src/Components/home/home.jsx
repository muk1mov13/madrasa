import React from 'react';
import "./home.scss"
import Header from "Components/header/header";
import '../News/style.css'
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
                                    <h1 data-animation-in="fadeInUp" data-animation-out="animate-out fadeOut">Ilm o‘rganish har bir <span>Musulmon</span> uchun farzdir!</h1>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                         version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
                                         style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve" width="512px"
                                         height="512px">
                                        <g>
                                            <g>
                                                <g>
                                                    <path
                                                        d="M65.826,170.317c4.523,1.323,9.259-1.28,10.573-5.811c25.276-86.81,106.146-147.439,196.668-147.439     c14.49,0,28.894,1.51,42.923,4.506c-0.307,12.279,4.992,20.702,8.405,26.112c0.947,1.502,2.236,3.55,2.389,3.831     c0,30.601-6.255,35.584-6.187,35.601c-13.833,0-36.531,12.356-45.065,28.288c-5.239,9.771-4.813,20.113,1.186,29.124     c4.113,6.17,7.654,13.03,11.085,19.669c7.253,14.046,15.3,29.628,27.938,29.628c2.671,0,5.555-0.7,8.678-2.261     c9.95-4.975,17.084-19.123,23.979-32.794c3.038-6.025,7.501-14.865,10.146-17.673c8.661,1.178,12.894,9.011,18.62,21.419     c4.215,9.131,8.576,18.56,17.143,22.844c14.421,7.211,61.841-0.341,88.047-11.469c3.917-1.664,6.007-5.965,4.898-10.078     c-17.911-66.219-66.56-121.301-130.15-147.337c-4.36-1.792-9.353,0.299-11.136,4.659s0.307,9.344,4.668,11.127     c56.329,23.074,99.96,70.818,118.008,128.649c-26.556,9.361-60.638,12.177-66.705,9.182c-3.208-1.604-6.434-8.576-9.276-14.729     c-5.948-12.885-14.097-30.532-34.901-31.454c-10.752-0.649-16.811,11.725-24.602,27.179     c-4.574,9.062-11.477,22.758-16.981,25.464c-3.166-0.742-9.455-12.919-13.21-20.19c-3.473-6.724-7.407-14.345-12.049-21.299     c-2.517-3.772-2.62-7.356-0.341-11.605c5.862-10.94,23.45-19.277,30.02-19.277c15.428,0,23.253-17.715,23.253-52.668     c0-4.966-2.551-9.011-5.009-12.928c-3.618-5.726-7.347-11.656-5.137-21.777c0.981-4.497-1.783-8.969-6.246-10.095     C309.786,2.261,291.482,0,273.067,0C175.002,0,87.39,65.69,60.015,159.744C58.692,164.267,61.303,169.003,65.826,170.317z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M375.433,226.304c-2.466,0.7-5.837,1.673-6.733,1.741c-11.793,0-19.268,9.131-24.721,15.795     c-2.082,2.543-5.845,7.108-8.243,7.177c-3.857-1.929-7.91-2.901-12.049-2.901c-10.061,0-18.773,5.982-20.719,14.242     c-1.374,5.803,0.649,13.747,10.419,18.637c13.858,6.929,28.186,14.089,34.56,20.463c4.386,4.386,11.972,6.903,20.821,6.903     c13.44,0,31.309-6.528,37.444-24.943c2.423-7.253,8.218-12.8,13.824-18.159c6.502-6.238,12.655-12.117,12.74-20.557     c0.06-4.984-2.15-9.745-6.554-14.157c-5.999-5.99-14.165-9.037-24.286-9.037C392.226,221.508,382.515,224.282,375.433,226.304z      M415.71,244.471c-0.401,1.681-4.651,5.751-7.475,8.456c-6.443,6.161-14.456,13.833-18.21,25.097     c-4.215,12.629-18.449,13.269-21.257,13.269c-4.975,0-8.098-1.314-8.747-1.894c-8.346-8.346-23.236-15.795-39.006-23.671     c-0.034-0.017-0.06-0.026-0.094-0.043c1.604-0.657,4.574-0.7,7.185,0.597c2.756,1.382,5.589,2.082,8.405,2.082     c9.446,0,15.411-7.287,20.668-13.713c3.849-4.685,7.817-9.54,11.52-9.54c3.029,0,6.554-1.007,11.418-2.398     c6.46-1.843,14.498-4.139,21.82-4.139c5.504,0,9.498,1.323,12.211,4.036C415.334,243.806,415.659,244.471,415.71,244.471z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M492.817,191.164c-0.649-4.676-5.018-7.927-9.617-7.287c-4.668,0.649-7.936,4.958-7.287,9.626     c1.297,9.378,1.954,18.927,1.954,28.365c0,112.111-90.539,203.46-202.342,204.783c-30.345-19.379-58.786-43.119-46.114-72.678     c22.75-53.103,1.579-72.892-7.467-81.357l-1.698-1.613c-2.586-2.577-5.504-4.335-8.073-5.879     c-6.246-3.746-7.927-4.753-4.574-14.814c2.219-6.682,5.171-9.796,8.576-13.406c7.893-8.346,13.926-16.648,13.926-40.781     c0-14.046-7.125-25.25-19.55-30.737c-14.089-6.229-32.905-4.028-42.854,5.001c-6.212,5.649-8.303,13.338-5.726,21.077     c6.084,18.219-7.817,44.553-33.792,64.034c-6.878,5.154-8.926,2.79-10.155,1.382c-7.62-8.781-7.031-33.758-0.777-40.004     c4.19-4.19,5.436-9.54,3.328-14.31c-6.912-15.676-51.004-14.464-59.75-14.054c-4.156,0.196-7.569,3.354-8.081,7.484     c-1.084,8.823-1.544,16.563-1.544,25.873c0,102.315,69.282,190.882,168.474,215.39c4.557,1.135,9.199-1.664,10.325-6.238     c1.135-4.574-1.664-9.199-6.238-10.325C132.207,398.071,68.267,316.305,68.267,221.867c0-5.922,0.205-11.153,0.657-16.486     c14.438-0.017,26.701,1.655,32.956,3.567c-9.788,15.283-8.713,45.329,3.251,59.119c8.576,9.882,21.018,10.291,33.289,1.084     c32.785-24.585,48.384-57.208,39.74-83.081c-0.273-0.845-0.546-1.638,1.024-3.063c4.489-4.079,15.915-5.803,24.465-2.014     c6.315,2.79,9.387,7.74,9.387,15.13c0,19.26-3.883,23.373-9.259,29.056c-3.985,4.224-8.951,9.472-12.373,19.738     c-7.671,23.049,4.634,30.438,11.989,34.85c1.903,1.135,3.695,2.21,4.787,3.302c0.623,0.623,1.331,1.289,2.108,2.014     c7.509,7.014,21.47,20.079,3.439,62.157c-20.446,47.71,32.273,80.973,54.784,95.181c1.365,0.853,2.944,1.314,4.557,1.314     c122.334,0,221.867-99.533,221.867-221.867C494.933,211.644,494.225,201.318,492.817,191.164z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M415.667,413.602c-41.438,30.874-90.752,47.198-142.601,47.198c-131.746,0-238.933-107.179-238.933-238.933     c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533c0,138.3,110.251,251.255,247.467,255.787v25.813     c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-25.941c52.403-1.698,102.144-18.85,144.265-50.236     c3.78-2.816,4.557-8.158,1.741-11.947C424.789,411.571,419.456,410.786,415.667,413.602z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M279.595,345.745c-10.65,0-23.142,12.254-27.699,23.253c-3.558,8.593-2.5,16.606,2.91,22.016     c5.094,5.094,12.655,8.021,20.745,8.021s15.65-2.927,20.753-8.021c5.666-5.666,7.049-13.995,3.891-23.441     c-2.125-6.383-6.34-13.133-11.255-18.057C286.498,347.085,283.179,345.745,279.595,345.745z M284.237,378.94     c-3.789,3.789-13.636,3.686-17.323,0.094c-0.119-0.367-0.111-2.5,2.15-6.238c2.944-4.855,7.1-8.286,9.353-9.506     c2.423,2.876,4.523,6.477,5.589,9.677C284.954,375.791,285.039,378.146,284.237,378.94z"
                                                        fill="#ffb606"/>
                                                </g>
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>

                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">E'lonlar</h2>
                                        <p className="hero_box_link">Batafsil</p>
                                    </div>
                                </div>
                            </Link>

                            <Link to={'/timetable'} className="col-lg-4 hero_box_col ">
                                <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                         version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512.001 512.001"
                                         style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve"
                                         width="512px" height="512px">
                                        <g>
                                            <g>
                                                <g>
                                                    <path
                                                        d="M256.001,221.868c10.761,0,20.13-4.045,25.6-7.049c5.47,3.004,14.839,7.049,25.6,7.049     c15.889,0,33.647-9.028,41.233-20.864c0.751-1.135,18.5-28.262,18.5-73.003c0-32.939-26.795-59.733-59.733-59.733     c-9.651,0-18.449,3.541-25.6,7.305c-7.151-3.763-15.949-7.305-25.6-7.305c-32.939,0-59.733,26.795-59.733,59.733     c0,50.56,15.727,70.204,19.149,73.865C223.13,211.577,238.968,221.868,256.001,221.868z M256.001,85.335     c7.612,0,15.394,3.942,21.325,7.381c2.645,1.536,5.905,1.536,8.55,0c5.931-3.439,13.713-7.381,21.325-7.381     c23.526,0,42.667,19.14,42.667,42.667c0,39.27-15.488,63.317-15.718,63.659c-3.985,6.212-16.026,13.141-26.948,13.141     c-10.999,0-20.446-6.801-20.506-6.844c-1.51-1.126-3.302-1.69-5.094-1.69s-3.584,0.563-5.094,1.69     c-0.094,0.068-9.506,6.844-20.506,6.844c-10.871,0-22.221-7.091-27.383-13.756c-0.171-0.222-0.461-0.546-0.657-0.751     c-0.145-0.154-14.626-16.026-14.626-62.293C213.334,104.475,232.474,85.335,256.001,85.335z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M274.288,55.596c1.596,2.662,4.42,4.139,7.322,4.139c1.493,0,3.012-0.393,4.386-1.22     c4.036-2.423,5.35-7.663,2.918-11.708l-25.6-42.667c-2.424-4.036-7.663-5.35-11.708-2.918c-4.036,2.423-5.35,7.663-2.918,11.708     L274.288,55.596z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M300.929,54.367c0.597,0.196,6.042,1.946,13.244,1.946h0.009c10.206,0,19.081-3.482,25.643-10.052     c15.616-15.616,8.414-37.956,8.098-38.904c-0.853-2.543-2.85-4.54-5.393-5.393c-0.606-0.196-6.05-1.946-13.261-1.946     c-10.206,0-19.072,3.473-25.643,10.044c-15.616,15.625-8.405,37.956-8.098,38.904C296.38,51.517,298.377,53.514,300.929,54.367z      M315.691,22.128c3.345-3.345,7.91-5.043,13.577-5.043c1.203,0,2.338,0.077,3.345,0.196c0.521,4.599,0.282,11.776-4.855,16.913     c-3.345,3.345-7.919,5.052-13.577,5.052c-1.203,0-2.338-0.085-3.345-0.196C310.315,34.442,310.554,27.265,315.691,22.128z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M486.401,238.935h-409.6c-14.114,0-25.6,11.486-25.6,25.6v34.133c0,4.71,3.823,8.533,8.533,8.533     s8.533-3.823,8.533-8.533v-34.133c0-4.702,3.831-8.533,8.533-8.533h25.6v42.667c0,4.71,3.823,8.533,8.533,8.533     s8.533-3.823,8.533-8.533v-42.667h221.867v42.667c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-42.667h85.333v42.667     c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533v-42.667h25.6c4.702,0,8.533,3.831,8.533,8.533v59.733h-25.6     c-4.71,0-8.533,3.823-8.533,8.533v76.8h-8.533c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h25.6v59.733     c0,4.702-3.831,8.533-8.533,8.533H204.801v-42.667c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v42.667h-17.067     v-42.667c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v42.667h-17.067v-42.667     c0-4.71-3.823-8.533-8.533-8.533s-8.533,3.823-8.533,8.533v42.667h-76.8c-4.702,0-8.533-3.831-8.533-8.533v-34.133     c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v34.133c0,14.114,11.486,25.6,25.6,25.6h426.667     c14.114,0,25.6-11.486,25.6-25.6v-59.733c0-11.085-8.789-17.067-17.067-17.067v-68.267h17.067     c8.277,0,17.067-5.982,17.067-17.067v-59.733C512.001,250.421,500.515,238.935,486.401,238.935z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M332.801,426.668c4.71,0,8.533-3.823,8.533-8.533c0-4.71-3.823-8.533-8.533-8.533h-93.867v-68.267h119.467v128     c0,3.149,1.732,6.042,4.506,7.526c2.765,1.476,6.144,1.314,8.764-0.427l20.864-13.909l20.864,13.909     c1.434,0.956,3.081,1.434,4.736,1.434c1.382,0,2.765-0.333,4.028-1.007c2.773-1.485,4.506-4.378,4.506-7.526v-128h8.533     c4.71,0,8.533-3.823,8.533-8.533s-3.823-8.533-8.533-8.533h-409.6c-14.353,0-25.6,11.247-25.6,25.6v51.2     c0,14.114,11.486,25.6,25.6,25.6H332.801z M375.467,341.335h34.133v112.051l-12.331-8.218c-2.867-1.911-6.605-1.911-9.472,0     l-12.331,8.218V341.335z M102.401,341.335h119.467v68.267H102.401V341.335z M17.067,401.068v-51.2     c0-4.864,3.669-8.533,8.533-8.533h59.733v68.267H25.601C20.814,409.602,17.067,405.855,17.067,401.068z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M179.201,358.401c-4.71,0-8.533,3.823-8.533,8.533v17.067c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533     v-17.067C187.734,362.224,183.911,358.401,179.201,358.401z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M145.067,358.401c-4.71,0-8.533,3.823-8.533,8.533v17.067c0,4.71,3.823,8.533,8.533,8.533     c4.71,0,8.533-3.823,8.533-8.533v-17.067C153.601,362.224,149.778,358.401,145.067,358.401z"
                                                        fill="#ffb606"/>
                                                </g>
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">Dars jadval</h2>
                                        <p className="hero_box_link">Batafsil</p>
                                    </div>
                                </div>
                            </Link>

                            <Link to={'/rating'} className="col-lg-4 hero_box_col">
                                <div className="hero_box d-flex flex-row align-items-center justify-content-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                         version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"
                                         style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve" width="512px"
                                         height="512px">
                                        <g>
                                            <g>
                                                <g>
                                                    <path
                                                        d="M50.918,445.739c1.143,0,2.295-0.23,3.405-0.717c27.221-11.853,73.19-18.022,136.678-18.347l6.161,12.339     c2.116,4.216,7.245,5.939,11.452,3.814c4.215-2.108,5.931-7.228,3.814-11.443l-8.525-17.067     c-1.451-2.893-4.403-4.719-7.637-4.719c-69.538,0-118.204,6.468-148.762,19.772c-4.318,1.886-6.289,6.912-4.412,11.238     C44.493,443.819,47.625,445.739,50.918,445.739z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M494.933,460.8h-17.067v-42.667c0-2.261-0.905-4.437-2.5-6.033l-51.268-51.26c1.604-3.337,2.569-7.031,2.569-10.974     c0-14.114-11.486-25.6-25.6-25.6c-14.114,0-25.6,11.486-25.6,25.6s11.486,25.6,25.6,25.6c3.942,0,7.629-0.964,10.965-2.56     l48.768,48.759V460.8H17.067C7.654,460.8,0,468.454,0,477.867v25.6C0,508.177,3.823,512,8.533,512s8.533-3.823,8.533-8.533v-25.6     h477.867v25.6c0,4.71,3.814,8.533,8.533,8.533c4.719,0,8.533-3.823,8.533-8.533v-25.6C512,468.454,504.337,460.8,494.933,460.8z      M401.067,358.4c-4.71,0-8.533-3.831-8.533-8.533s3.823-8.533,8.533-8.533s8.533,3.831,8.533,8.533S405.777,358.4,401.067,358.4z     "
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M121.83,255.249c6.221,16.196,26.803,68.42,41.737,90.82l1.348,2.039c10.957,16.614,29.286,44.424,91.085,44.424     c61.79,0,80.128-27.81,91.085-44.424l1.348-2.039c14.933-22.4,35.507-74.624,41.737-90.82c11.145-2.773,19.43-12.86,19.43-24.849     v-34.133c0-11.127-7.134-20.617-17.067-24.141V128c0-33.69-17.741-95.923-83.362-101.931c-0.128-4.028-1.459-7.27-2.944-9.668     C297.839,2.842,274.287,0,256,0C104.158,0,102.4,143.616,102.4,145.067c0,4.71,3.814,8.525,8.516,8.525h0.017     c4.702,0,8.516-3.806,8.533-8.516c0.017-5.222,1.937-128.009,136.533-128.009c24.132,0,33.801,5.222,35.712,8.311     c0.265,0.435,0.99,1.604-0.683,4.941c-1.323,2.645-1.178,5.786,0.375,8.303c1.562,2.509,4.301,4.045,7.262,4.045     c75.657,0,76.791,81.86,76.8,85.333v51.2c0,4.71,3.814,8.533,8.533,8.533c4.71,0,8.533,3.831,8.533,8.533V230.4     c0,4.702-3.823,8.533-8.533,8.533c-3.558,0-6.741,2.21-7.996,5.538c-0.247,0.674-25.446,67.644-41.771,92.126l-1.399,2.116     c-10.223,15.514-24.235,36.753-76.834,36.753c-52.608,0-66.611-21.239-76.834-36.753l-1.399-2.116     c-16.324-24.482-41.523-91.452-41.779-92.126c-1.246-3.328-4.429-5.538-7.987-5.538c-4.702,0-8.533-3.831-8.533-8.533v-34.133     c0-2.313,0.922-4.412,2.423-5.948c3.098,6.955,9.421,13.21,20.045,14.268l29.201,21.897C173.414,243.106,187.554,256,204.8,256     h17.067C240.691,256,256,240.691,256,221.867C256,240.691,271.309,256,290.133,256H307.2c17.237,0,31.394-12.894,33.664-29.525     l31.189-23.381c3.772-2.825,4.54-8.175,1.707-11.947c-2.825-3.772-8.175-4.548-11.947-1.707l-21.751,16.316     c-3.251-10.402-12.86-18.022-24.329-18.022H281.6c-14.114,0-25.6,11.486-25.6,25.6c0-14.114-11.486-25.6-25.6-25.6h-34.133     c-11.46,0-21.069,7.62-24.328,18.022l-16.282-12.211c6.716-16.23,12.8-40.235,14.524-57.088     c26.897-0.478,104.713-3.763,139.332-25.37c7.851,30.31,33.05,55.817,34.321,57.08c3.336,3.336,8.73,3.336,12.066,0     c3.336-3.337,3.336-8.73,0-12.066c-0.316-0.316-31.633-31.983-31.633-62.234c0-3.831-2.56-7.202-6.255-8.226     c-3.678-1.024-7.629,0.546-9.591,3.831c-12.425,20.693-93.022,29.995-146.287,29.995c-4.71,0-8.533,3.823-8.533,8.533     c0,13.85-6.545,41.515-13.508,58.539c-2.722-1.638-3.49-4.693-3.558-7.339c0-4.71-3.823-8.533-8.533-8.533     c-14.114,0-25.6,11.486-25.6,25.6V230.4C102.4,242.389,110.686,252.476,121.83,255.249z M273.067,213.333     c0-4.702,3.823-8.533,8.533-8.533h34.133c4.71,0,8.533,3.831,8.533,8.533v8.533c0,9.412-7.654,17.067-17.067,17.067h-17.067     c-9.412,0-17.067-7.654-17.067-17.067V213.333z M187.733,213.333c0-4.702,3.831-8.533,8.533-8.533H230.4     c4.702,0,8.533,3.831,8.533,8.533v8.533c0,9.412-7.654,17.067-17.067,17.067H204.8c-9.412,0-17.067-7.654-17.067-17.067V213.333z     "
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M298.658,307.226c0.009-4.702-3.797-8.533-8.499-8.559c-0.162,0-15.42-0.171-30.345-7.637     c-2.398-1.195-5.231-1.195-7.629,0c-14.925,7.467-30.191,7.637-30.319,7.637c-4.71,0-8.533,3.823-8.533,8.533     s3.823,8.533,8.533,8.533c0.725,0,16.845-0.094,34.133-7.654c17.28,7.56,33.408,7.654,34.133,7.654     C294.835,315.733,298.641,311.927,298.658,307.226z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M315.708,409.95c-3.191,0.017-6.118,1.809-7.578,4.659l-8.533,16.708c-2.142,4.198-0.469,9.344,3.721,11.486     c1.237,0.631,2.569,0.93,3.874,0.93c3.106,0,6.101-1.698,7.612-4.651l6.153-12.066c46.643,0.128,84.207,3.618,111.735,10.377     c4.591,1.135,9.199-1.672,10.317-6.246c1.126-4.582-1.664-9.199-6.246-10.325C406.878,413.474,366.345,409.651,315.708,409.95z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M247.467,418.133V435.2c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-17.067c0-4.71-3.823-8.533-8.533-8.533     S247.467,413.423,247.467,418.133z"
                                                        fill="#ffb606"/>
                                                    <path
                                                        d="M247.467,324.267c-4.71,0-8.533,3.823-8.533,8.533c0,4.71,3.823,8.533,8.533,8.533h17.067     c4.719,0,8.533-3.823,8.533-8.533c0-4.71-3.814-8.533-8.533-8.533H247.467z"
                                                        fill="#ffb606"/>
                                                </g>
                                            </g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                        <g>
                                        </g>
                                    </svg>
                                    <div className="hero_box_content">
                                        <h2 className="hero_box_title">Rating</h2>
                                        <p className="hero_box_link">Batafsil</p>
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