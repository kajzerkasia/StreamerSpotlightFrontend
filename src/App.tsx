import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { StreamerTable } from "./components/StreamerTable/StreamerTable";
import { Votes } from "./components/Votes/Votes";
import { StreamerRecord } from "./components/StreamerRecord/StreamerRecord";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import "./App.css";

export const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/streamers" />} />
    <Route path="/streamers" element={<StreamerTable />} />
    <Route path="/streamer/:streamerId" element={<StreamerRecord />} />
    <Route path="/streamers/:streamerId/vote" element={<Votes />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

//@TODO: Responsiveness - CSS - smaller screens
