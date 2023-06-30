import React, { useEffect, useState } from "react";
import { StreamerEntity } from "types";
import { apiUrl } from "../../config/api";
import { useParams } from "react-router-dom";
import { Button } from "../Button/Button";
import { BarLoader } from "react-spinners";
import "./StreamerRecord.css";

export const StreamerRecord = () => {
  const [streamer, setStreamer] = useState<StreamerEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Dodajemy stan dla ładowania

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
      abortController.abort();
    };
  }, [streamerId]);

  if (isLoading) {
    return (
      <div className="spinner_container">
        <BarLoader color="#3d63cb" />
        <div>Loading streamer data...</div>
      </div>
    );
  }

  if (!streamer) {
    return <div>Loading streamer data...</div>;
  }

  return (
    <div className="div_streamer_record">
      <div className="streamer_record_container">
        <div className="streamer_info">
          <img
            src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png"
            alt="Streamer"
          />
          <div className="description">{streamer.description}</div>
          <div className="streamer_name">{streamer.name}</div>
        </div>
        <div className="streamer_details">
          <table className="one_streamer_table">
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{streamer.name}</td>
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
