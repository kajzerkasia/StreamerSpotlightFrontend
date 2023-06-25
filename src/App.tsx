import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import {StreamerTable} from "./components/Streamer/StreamerTable";
import {Votes} from "./components/Votes/Votes";
import {StreamerRecord} from "./components/Streamer/StreamerRecord";

export const App = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/streamers"/>}/>
        <Route path="/streamers" element={<StreamerTable/>}/>
        <Route path="/streamer/:streamerId" element={<StreamerRecord/>}/>
        <Route path="/streamers/:streamerId/vote" element={<Votes/>}/>
    </Routes>
);