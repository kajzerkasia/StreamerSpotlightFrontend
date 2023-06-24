import React from "react";
import {TbBrandKick, TbBrandTiktok, TbBrandTwitch, TbBrandYoutube} from "react-icons/tb";

export const getPlatformIcon = (platform: string) => {
    switch (platform) {
        case "Twitch":
            return <TbBrandTwitch style={{verticalAlign: "-3px"}}/>;
        case "YouTube":
            return <TbBrandYoutube style={{verticalAlign: "-3px"}}/>;
        case "TikTok":
            return <TbBrandTiktok style={{verticalAlign: "-3px"}}/>;
        case "Kick":
            return <TbBrandKick style={{verticalAlign: "-3px"}}/>;
        default:
            return null;
    }
};
