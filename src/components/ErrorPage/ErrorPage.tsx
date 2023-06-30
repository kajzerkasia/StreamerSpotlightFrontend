import React from "react";
import { TbMoodCry } from "react-icons/tb";
import { IconContext } from "react-icons";
import { Button } from "../Button/Button";
import "./ErrorPage.css";

export const ErrorPage = () => {
  return (
    <div className="error_container">
      <h1 className="h1_error">Oops.. There's nothing here</h1>
      <IconContext.Provider value={{ className: "react_icon_cry" }}>
        <TbMoodCry />
      </IconContext.Provider>
      <div className="error_button">
        <Button to="streamers">Go to home page</Button>
      </div>
    </div>
  );
};
