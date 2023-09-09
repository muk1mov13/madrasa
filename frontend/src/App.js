import React, {useEffect, useCallback, useState} from "react";
import {Route, Routes, useLocation} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import instance from './instance/index';
import ErrorPage from "./Components/404/ErrorPage";
import Group from './Components/Group/Group'
import Lesson from './Components/Lesson/Lesson'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {useDispatch} from "react-redux";
import Home from "Components/home/home";
import Login from "Components/Login/login";
import Loader from "ui/loader";
import {ToastContainer} from "react-toastify";
import Rating from "Components/rating/rating";
import RatingGroup from "Components/rating/rating-group/rating-group";

function App() {

    const blockedPages = ["/dashboard"];
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const checkSecurity = useCallback(async () => {

        if (blockedPages.some((blockedPage) => location.pathname.startsWith(blockedPage))) {
            let accessToken = localStorage.getItem("access_token");
            if (accessToken !== null) {
                try {
                    const res = await instance("/api/v1/security", "GET");
                    if (res?.data !== 401 && res?.error) {
                        if (res?.data[0].name !== "ROLE_SUPER_ADMIN") {
                            navigate("/404");
                        }
                    }
                } catch (error) {
                    navigate("/");
                }
            } else {
                navigate("/");
            }
        }
    }, [blockedPages, location.pathname, navigate]);
    useEffect(() => {
        checkSecurity();

        const handleStorageChange = (event) => {
            if (!localStorage.getItem("access_token")) {
                navigate("/");
            } else {
                checkSecurity();
            }
        };
        window.addEventListener("storage", handleStorageChange);

        const handleBeforeUnload = () => {
            handleStorageChange();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [checkSecurity, navigate]);

    // loading
    const [loading, setLoading] = useState(false);
    useEffect(() => {
            setLoading(true);
            const loadingTimeout = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => clearTimeout(loadingTimeout);
        }, [location.pathname]
    )
    ;

    return (
        loading ? <Loader/> :
            <div className="App">
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/timetable" element={<Group/>}/>
                    <Route path="/timetable/lesson/:groupId" element={<Lesson/>}/>
                    <Route path="/404" element={<ErrorPage/>}/>
                    <Route path="/rating" element={<Rating/>}/>
                    <Route path="/rating/:courseId" element={<Rating/>}/>
                    <Route path="/rating/:courseId/:groupId" element={<RatingGroup/>}/>
                </Routes>
            </div>
    );
}

export default App;
