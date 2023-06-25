import React from 'react';
import './StreamerRecord.css';

export const StreamerRecord = () => {
    return (
        <div className="streamer_record_container">
            <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png" alt="Zdjęcie streamera"/>
            <h2>Nazwa Streamera</h2>
            <p>Opis</p>
            <p>Platforma</p>
        </div>
    );
};
