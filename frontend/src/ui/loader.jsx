import React from 'react';
import "./loader.scss"

function Loader(props) {
    return (
        <div className={"my-loader"}>
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;