import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import "./Votes.css";

export const Votes = () => {
    const [likes, setLikes] = useState(0); // Początkowa wartość liczby głosów za
    const [dislikes, setDislikes] = useState(0); // Początkowa wartość liczby głosów przeciw
    const [hasVotedFor, setHasVotedFor] = useState(false); // Czy użytkownik oddał już głos za
    const [hasVotedAgainst, setHasVotedAgainst] = useState(false); // Czy użytkownik oddał już głos przeciw

    const handleLikeClick = () => {
        if (!hasVotedFor && !hasVotedAgainst) {
            setLikes(likes + 1);
            setHasVotedFor(true);
        }
    };

    const handleDislikeClick = () => {
        if (!hasVotedFor && !hasVotedAgainst) {
            setDislikes(dislikes + 1);
            setHasVotedAgainst(true);
        }
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