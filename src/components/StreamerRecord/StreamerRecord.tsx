import React, { useEffect, useState } from "react";
import { StreamerEntity } from "types";
import { apiUrl } from "../../config/api";
import { useParams } from "react-router-dom";
import { Button } from "../Button/Button";
import { MoonLoader } from "react-spinners";
import "./StreamerRecord.css";
import { TbBroadcast } from "react-icons/tb";
import { IconContext } from "react-icons";

export const StreamerRecord = () => {
  const [streamer, setStreamer] = useState<StreamerEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { streamerId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`${apiUrl}/api/streamer/streamer/${streamerId}`, {
      method: "GET",
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((streamerData) => {
        setStreamer(streamerData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred when fetching streamer data:", error);
        setIsLoading(false);
      });

    return () => {
      try {
        abortController.abort();
      } catch (error) {
        console.error("An error occurred while aborting the request:", error);
      }
    };
  }, [streamerId]);

  if (isLoading || !streamer) {
    return (
      <div className="spinner_container">
        <div className="div_loading">Loading streamer data...</div>
        <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
      </div>
    );
  }

  return (
    <div className="div_streamer_record">
      <IconContext.Provider value={{ className: "react_icon_logo" }}>
        <h1 className="main_h1_streamers">
          <TbBroadcast />
          Streamer Spotlight App
        </h1>
      </IconContext.Provider>
      <div className="streamer_record_container">
        <div className="streamer_info">
          <img
            className="streamer_img"
            src={require("../../assets/streamer_img.jpg")}
            alt="Streamer"
          />
          <div className="description">{streamer.description}</div>
        </div>
        <div className="streamer_details">
          <table className="one_streamer_table">
            <tbody>
              <tr>
                <th>Name:</th>
                <td className="streamer_name">{streamer.name}</td>
              </tr>
              <tr>
                <th>Platform:</th>
                <td>{streamer.platform}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="button_container">
        <Button to="/streamers">Go back to the streamers list</Button>
      </div>
    </div>
  );
};
