import React from 'react';
import {IconContext} from "react-icons";
import {BiSolidLike, BiSolidDislike} from "react-icons/bi";
import "./Votes.css";

export const Votes = () => {
    return (
        <div className="div_votes_container">
            <IconContext.Provider value={{className: 'react_icon_like'}}>
                <p><BiSolidLike/>321</p>
            </IconContext.Provider>
            <IconContext.Provider value={{className: 'react_icon_dislike'}}>
                <p><BiSolidDislike/>123</p>
            </IconContext.Provider>
        </div>
    );
};
