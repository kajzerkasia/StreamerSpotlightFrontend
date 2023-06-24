import React, {useEffect, useState} from 'react';
import {StreamerEntity, Status} from 'types';
import {TbX, TbBroadcast} from "react-icons/tb";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/api";
import './StreamerTable.css';
import {StreamerForm} from "./StreamerForm";

export const StreamerTable = () => {

    const [streamersList, setStreamersList] = useState<StreamerEntity[]>([]);
    const [confirmDeleteStreamer, setConfirmDeleteStreamer] = useState<boolean>(false);
    const [streamerToDeleteId, setStreamerToDeleteId] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(`${apiUrl}/api/streamer/streamers`, {
            method: 'GET',
            signal: abortController.signal
        }).then(res => res.json())
            .then((streamers) => {
                setStreamersList(streamers)
            })

        return () => {
            try {
                abortController.abort()
            } catch {
            }
        };
    }, [])

    const addStreamer = async (values: StreamerEntity) => {

        const res = await fetch(`${apiUrl}/api/streamer/streamers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        const data = await res.json();

        setStreamersList(list => [...list, data]);

    };

    const editStreamer = async (values: StreamerEntity) => {
        const res = await fetch(`${apiUrl}/api/streamer/streamers/${values.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        if (!res.ok) {
            throw new Error('An error occurred while trying to update the streamer name.');
        }
        return await res.json();
    };

    const handleUpdateStreamer = (updatedStreamer: StreamerEntity) => {
        setStreamersList((streamersList) =>
            streamersList.map((streamer) =>
                streamer.id === updatedStreamer.id ? updatedStreamer : streamer
            )
        );
    };

    const handleDeleteStreamer = async (streamerId: any) => {
        setStreamerToDeleteId(streamerId);
    };

    const handleConfirmDelete = async () => {
        const res = await fetch(
            `${apiUrl}/api/streamer/streamers/${streamerToDeleteId}`,
            {method: "DELETE"}
        )
        if ([400, 500].includes(res.status)) {
            const error = await res.json();
            alert(`An error occured: ${error.message}`);
            return;
        }
        setStreamersList((streamersList) =>
            streamersList.filter((streamer) => streamer.id !== streamerToDeleteId)
        );
        setConfirmDeleteStreamer(false);

    };

    const handleCancelDelete = () => {
        setConfirmDeleteStreamer(false);
        setStreamerToDeleteId(null);
    };

    return (
        <div className="div_streamers_container">
            <IconContext.Provider value={{className: 'react_icon_logo'}}>
                <h1 className="main_h1_streamers"><TbBroadcast/>Streamer Spotlight App</h1>
            </IconContext.Provider>

            <div className="div_streamers_table_container">
                <table className="streamers_table">

                    <thead>
                    <tr>
                        <td className="training-plans" align="center" colSpan={4}>
                            <h2 className="h2_streamers"> Top Streamers</h2>
                        </td>
                    </tr>
                    </thead>

                    <tbody>
                    <tr className="div_streamer_input_group">
                        <StreamerForm
                            initialValues={{
                                name: '',
                                platform: '',
                            }}
                            onSubmit={async (values, reset) => {
                                if (
                                    values.name &&
                                    values.platform
                                ) {
                                    await addStreamer(values);
                                    reset();
                                }

                                // else {
                                //     setInformationModalIsOpen(true);
                                // }
                            }}
                            actionType={Status.Add}
                        />
                    </tr>

                    {streamersList.map((streamer) => (
                        <tr
                            key={`${streamer.id}`}
                        >
                            <StreamerForm
                                initialValues={streamer}
                                onSubmit={async (values) => {
                                    if (values.name) {
                                        await editStreamer(values);
                                        await handleUpdateStreamer(values);
                                    } else {
                                        // setInformationModalIsOpen(true);
                                        values.name = streamer.name;
                                        values.platform = streamer.platform;
                                    }
                                }}
                                actionType={Status.Save}
                            />
                            <td>
                                <IconContext.Provider value={{className: 'react-icons'}}>
                                    <button onClick={() => handleDeleteStreamer(streamer.id)}><TbX/></button>
                                </IconContext.Provider>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {/*<ConfirmationModal*/}
            {/*    isOpen={confirmDeletePlan}*/}
            {/*    onRequestClose={handleCancelDelete}*/}
            {/*    onConfirm={handleConfirmDelete}*/}
            {/*    onCancel={handleCancelDelete}*/}
            {/*    text={text}*/}
            {/*/>*/}
            {/*<InformationModal*/}
            {/*    isOpen={informationModalIsOpen}*/}
            {/*    onRequestClose={closeModal}*/}
            {/*    onConfirm={closeModal}*/}
            {/*    onCancel={closeModal}*/}
            {/*    text={textInformation}*/}
            {/*/>*/}
        </div>
    )
}
