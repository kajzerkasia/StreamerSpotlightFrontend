import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import "./Votes.css";

export const Votes = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    const handleDislikeClick = () => {
        setDislikes(dislikes + 1);
    };

    return (
        <div className="div_votes_container">
            <IconContext.Provider value={{ className: 'react_icon_like' }}>
                <p>
                    <BiSolidLike onClick={handleLikeClick} /> {likes}
                </p>
            </IconContext.Provider>
            <IconContext.Provider value={{ className: 'react_icon_dislike' }}>
                <p>
                    <BiSolidDislike onClick={handleDislikeClick} /> {dislikes}
                </p>
            </IconContext.Provider>
        </div>
    );
};