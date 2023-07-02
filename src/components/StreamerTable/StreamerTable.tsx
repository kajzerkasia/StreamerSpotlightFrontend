import React, { useEffect, useState } from "react";
import { StreamerEntity, Status } from "types";
import { IconContext } from "react-icons";
import { apiUrl } from "../../config/api";
import { TbBroadcast } from "react-icons/tb";
import { StreamerForm } from "../StreamerForm/StreamerForm";
import { Votes } from "../Votes/Votes";
import "./StreamerTable.css";
import { MoonLoader } from "react-spinners";

export const StreamerTable = () => {
  const [streamersList, setStreamersList] = useState<StreamerEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const abortController = new AbortController();
    fetch(`${apiUrl}/api/streamer/streamers`, {
      method: "GET"
      // signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((streamers) => {
        setStreamersList(streamers);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred when fetching streamers data:", error);
        setIsLoading(false);
      });
    // return () => {
    //   try {
    //     abortController.abort();
    //   } catch (error) {
    //     console.error("An error occurred while aborting the request:", error);
    //   }
    // };
  }, []);

  const addStreamer = async (values: StreamerEntity) => {
    const res = await fetch(`${apiUrl}/api/streamer/streamers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const streamer = await res.json();

    await fetch(`${apiUrl}/api/vote/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        streamerId: streamer.id,
        upvotes: 0,
        downvotes: 0
      })
    });
    setStreamersList((list) => [...list, streamer]);
  };

  if (isLoading) {
    return (
      <div className="spinner_container">
        <div className="div_loading">Loading streamers data...</div>
        <MoonLoader speedMultiplier={0.5} color="#9fc3f870" />
      </div>
    );
  }

  return (
    <div className="div_streamers_container">
      <IconContext.Provider value={{ className: "react_icon_logo" }}>
        <h1 className="main_h1_streamers">
          <TbBroadcast />
          Streamer Spotlight App
        </h1>
      </IconContext.Provider>
      <div className="div_streamers_table_container">
        <table className="streamers_table">
          <thead>
          <tr>
            <td align="center" colSpan={4}>
              <h2 className="h2_streamers"> Top Streamers</h2>
            </td>
          </tr>
          </thead>
          <tbody>
          <tr className="div_streamer_input_group">
            <StreamerForm
              initialValues={{
                name: "",
                platform: "",
                description: ""
              }}
              onSubmit={async (values, reset) => {
                await addStreamer(values);
                reset();
              }}
              actionType={Status.Add}
              streamersList={streamersList}
            />
          </tr>
          {streamersList.map((streamer) => (
            <tr key={`${streamer.id}`}>
              <StreamerForm
                initialValues={{
                  name: streamer.name,
                  platform: streamer.platform,
                  description: streamer.description
                }}
                actionType={Status.Save}
                streamerId={streamer.id}
                votes={<Votes streamerId={streamer.id} />}
                streamersList={streamersList}
              />
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
