import React from 'react';
import {TbMoodCry} from "react-icons/tb";
import {IconContext} from "react-icons";
import './ErrorPage.css';
import {Button} from "../Button/Button";


export const ErrorPage = () => {
    return (
        <div className="error-container">
            <h1 className="h1_error">Oops.. There's nothing here</h1>
            <IconContext.Provider value={{className: 'react-icons-cry'}}>
                <TbMoodCry/>
            </IconContext.Provider>
            <div className="error_button">
            <Button to="streamers">Go to home page</Button>
            </div>
        </div>
    );
};
