import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import {StreamerTable} from "./components/Streamer/StreamerTable";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/streamers"/>}/>
      <Route path="/streamers" element={<StreamerTable/>}></Route>
    </Routes>
  );
}

export default App;
