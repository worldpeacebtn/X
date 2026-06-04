import React from "react";
import { Routes, Route } from "react-router-dom";
import HoloBackground from "./components/HoloBackground";
import NavBar from "./components/NavBar";

import Auth from "./pages/Auth";
import Vault from "./pages/Vault";
import Upload from "./pages/Upload";
import FileView from "./pages/FileView";
import Share from "./pages/Share";
import Profile from "./pages/Profile";

import FilePage from "./pages/FilePage";

export default function App() {
  return (
<div style={{ display: 'flex', gap: '20px', justifyContent: 'center', fontFamily: 'sans-serif' }}>
  {[1, 2, 3].map((num) => (
    <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '200px' }}>
      
  <img src="./components/IMG_1220.png" alt="">
  <img src="./components/IMG_1221.png" alt="">
  <img src="./components/IMG_1226.png" alt="">
  </div>
      <HoloBackground />
      <NavBar />
      <div className="relative z-10 p-6 md:p-10">
        <Routes>
          <Route path="/" element={<Vault />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/file/:id" element={<FilePage />} />
          <Route path="/share/:tag" element={<Share />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
