import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import "./Votes.css";
import { apiUrl } from "../../config/api";
import { VoteEntity } from "types";

export const Votes = ({ streamerId }: VoteEntity) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasVotedFor, setHasVotedFor] = useState(false);
  const [hasVotedAgainst, setHasVotedAgainst] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`${apiUrl}/api/vote/streamers/${streamerId}/vote`, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch votes");
      })
      .then((votesData) => {
        setLikes(votesData.likes);
        setDislikes(votesData.dislikes);
        setHasVotedFor(votesData.hasVotedFor);
        setHasVotedAgainst(votesData.hasVotedAgainst);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      try {
        abortController.abort();
      } catch (error) {
        console.error("An error occurred while aborting the request:", error);
      }
    };
  }, [streamerId]);

  const handleLikeClick = () => {
    if (!hasVotedFor && !hasVotedAgainst) {
      fetch(`${apiUrl}/api/vote/streamers/${streamerId}/vote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vote: "upvote" }),
      })
        .then((response) => {
          if (response.ok) {
            setLikes(likes + 1);
            setHasVotedFor(true);
          } else {
            throw new Error("Failed to update vote");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDislikeClick = () => {
    if (!hasVotedFor && !hasVotedAgainst) {
      fetch(`${apiUrl}/api/vote/streamers/${streamerId}/vote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vote: "downvote" }),
      })
        .then((response) => {
          if (response.ok) {
            setDislikes(dislikes + 1);
            setHasVotedAgainst(true);
          } else {
            throw new Error("Failed to update vote");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="div_votes_container votes_td">
      <IconContext.Provider value={{ className: "react_icon_like" }}>
        <div className="votes_container">
          <div className="div_icon"><BiSolidLike onClick={handleLikeClick} /></div>
          <div className="div_text">{likes}</div>
        </div>
      </IconContext.Provider>
      <IconContext.Provider value={{ className: "react_icon_dislike" }}>
        <div className="votes_container">
          <div className="div_icon"><BiSolidDislike onClick={handleDislikeClick} /></div>
          <div className="div_text">{dislikes}</div>
        </div>
      </IconContext.Provider>
    </div>
  );
};
