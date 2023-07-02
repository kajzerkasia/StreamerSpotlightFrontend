import React, { useEffect, useState } from "react";
import { StreamerEntity, Status } from "types";
import { IconContext } from "react-icons";
import { apiUrl } from "../../config/api";
import { TbAlertTriangle, TbBroadcast } from "react-icons/tb";
import { StreamerForm } from "../StreamerForm/StreamerForm";
import { Votes } from "../Votes/Votes";
import { CustomModal } from "../CustomModal/CustomModal";
import "./StreamerTable.css";
import { confirmationText, text } from "../../utils/streamerTableTexts";

export const StreamerTable = () => {
  const [streamersList, setStreamersList] = useState<StreamerEntity[]>([]);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // const abortController = new AbortController();
    fetch(`${apiUrl}/api/streamer/streamers`, {
      method: "GET",
      // signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((streamers) => {
        setStreamersList(streamers);
      });
    // return () => {
    //   try {
    //     abortController.abort();
    //   } catch (error) {
    //     console.error("An error occurred while aborting the request:", error);
    //   }
    // };
  }, []);

  const closeModal = () => {
    setErrorModalIsOpen(false);
  };

  const addStreamer = async (values: StreamerEntity) => {

    const isStreamerExist = streamersList.some((streamer) => streamer.name === values.name);
    if (isStreamerExist) {
      setErrorModalIsOpen(true);
      return;
    }

    if (values.description && values.description.length > 1000) {
      setErrorModalIsOpen(true);
      return;
    }

    const res = await fetch(`${apiUrl}/api/streamer/streamers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const streamer = await res.json();

    await fetch(`${apiUrl}/api/vote/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        streamerId: streamer.id,
        upvotes: 0,
        downvotes: 0,
      }),
    });
    setStreamersList((list) => [...list, streamer]);
  };

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
                  description: "",
                }}
                onSubmit={async (values, reset) => {
                  if (values.name && values.platform && values.description) {
                    await addStreamer(values);
                    reset();
                  } else {
                    setErrorModalIsOpen(true);
                  }
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
                    description: streamer.description,
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
        <CustomModal
          isOpen={errorModalIsOpen}
          onRequestClose={closeModal}
          onConfirm={closeModal}
          onCancel={closeModal}
          text={text}
          content={
            <IconContext.Provider value={{ className: "icon_modal_alert" }}>
              <TbAlertTriangle />
            </IconContext.Provider>
          }
          confirmationText={confirmationText}
        />
      </div>
    </div>
  );
};