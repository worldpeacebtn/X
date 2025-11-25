import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HoloBackground from "./components/HoloBackground";
import Vault from "./pages/Vault";

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full overflow-hidden">
        <HoloBackground />
        <div className="relative z-10 p-6 md:p-10">
          <Routes>
            <Route path="/" element={<Vault />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
