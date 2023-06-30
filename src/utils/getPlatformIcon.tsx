import React from "react";
import {
  TbBrandKick,
  TbBrandTiktok,
  TbBrandTwitch,
  TbBrandYoutube,
} from "react-icons/tb";
import "./getPlatformIcon.css";

export const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "Twitch":
      return <TbBrandTwitch style={{ verticalAlign: "-3px" }} />;
    case "YouTube":
      return <TbBrandYoutube style={{ verticalAlign: "-3px" }} />;
    case "TikTok":
      return <TbBrandTiktok style={{ verticalAlign: "-3px" }} />;
    case "Kick":
      return <TbBrandKick style={{ verticalAlign: "-3px" }} />;
    case "Rumble":
      return (
        <img
          className="img_rumble_logo"
          src={require("../assets/logo_rumble.png")}
          alt="Rumble logo"
        />
      );
    default:
      return null;
  }
};
