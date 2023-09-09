import React, {useState} from 'react';
import "./rating.scss"
import Header from "Components/header/header";
import DataLoading from "ui/dataLoading";

function Rating(props) {

    const [loading, setLoading] = useState(false);

    const [courses, setCourses] = useState([{
        id: 1,
        name: "Course 1",
    }, {
        id: 1,
        name: "Course 2",
    },
        {
            id: 1,
            name: "Course 3",
        },
    ])

    return (
        <div className={"my-rating"}>
            <div>
                <Header/>
            </div>

            <div style={{marginTop: '200px'}} className={"container"} >
                <div className={"courses-outer"}>
                    {
                        loading ? <DataLoading/> : courses?.map(course => (
                            <div className={"course"} key={course.id}>
                                <h4>{course.name}</h4>
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>
    );
}

export default Rating;