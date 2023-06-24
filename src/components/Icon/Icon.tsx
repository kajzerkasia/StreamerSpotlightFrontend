import React from "react";
import {BiSolidDownArrow} from "react-icons/bi";
import {IconContext} from "react-icons";
import './Icon.css';

export const Icon = () => {
    return (
        <IconContext.Provider value={{className: 'react_icon_arrow_down'}}>
            <BiSolidDownArrow/>
        </IconContext.Provider>
    );
};