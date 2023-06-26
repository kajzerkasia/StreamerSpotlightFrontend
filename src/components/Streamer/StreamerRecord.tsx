import React, { useEffect, useState } from 'react';
import { StreamerEntity } from 'types';
import { apiUrl } from "../../config/api";
import './StreamerRecord.css';
import {Link, useParams} from "react-router-dom";
import {Button} from "../Button/Button";

export const StreamerRecord = () => {
    const [streamer, setStreamer] = useState<StreamerEntity | null>(null);

    const { streamerId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        fetch(`${apiUrl}/api/streamer/streamer/${streamerId}`, {
            method: 'GET',
            signal: abortController.signal
        })
            .then(res => res.json())
            .then((streamerData) => {
                setStreamer(streamerData);
            })
            .catch((error) => {
                console.error('Error fetching streamer data:', error);
            });

        return () => {
            abortController.abort();
        };
    }, [streamerId]);

    if (!streamer) {
        return <div>Loading streamer data...</div>;
    }

    return (
        <div className="div_streamer_record">
        <div className="streamer_record_container">
            <table className="one_streamer_table">
                <thead>
                <tr>
                    <th>Streamer Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Platform</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png" alt="Streamer" />
                    </td>
                    <td>{streamer.name}</td>
                    <td>{streamer.description}</td>
                    <td>{streamer.platform}</td>
                </tr>
                </tbody>
            </table>
        </div>
            <Button><Link to="/streamers">Go back to the streamers list</Link></Button>
        </div>
    );
};