
import React, {useEffect} from 'react';

import { useLocation, useParams } from "react-router-dom";

function Lesson(props) {
    const { groupId } = useParams(); // Access the groupId from useParams()

    const location = useLocation();

    useEffect(() => {
        // Your code here
    }, [location.pathname]);

    return (
        <div>
            <h1>Group ID: {groupId}</h1>
        </div>
    );
}

export default Lesson;
