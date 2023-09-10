import React, {useState} from 'react';
import "./rating.scss"
import Header from "Components/header/header";
import DataLoading from "ui/dataLoading";
import {Link} from "react-router-dom";

function Rating(props) {

    const [loading, setLoading] = useState(false);

    const [courses, setCourses] = useState([{
        id: 1,
        name: "Course 1",
    }, {
        id: 2,
        name: "Course 2",
    },
        {
            id: 3,
            name: "Course 3",
        },
        {
            id: 4,
            name: "Course 4",
        },
    ])

    return (
        <div className={"my-rating"}>
            <div>
                <Header/>
            </div>

            <div style={{marginTop: '200px'}} className={"container"} >
                <div className={"courses-outer"}>
                    <Link to={`/rating/${1}`} className={"course"} >
                        <h4>1-kurs</h4>
                    </Link>
                    <Link to={`/rating/${2}`} className={"course"} >
                        <h4>2-kurs</h4>
                    </Link>
                    <Link to={`/rating/${3}`} className={"course"} >
                        <h4>3-kurs</h4>
                    </Link>
                    <Link to={`/rating/${4}`} className={"course"} >
                        <h4>4-kurs</h4>
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Rating;