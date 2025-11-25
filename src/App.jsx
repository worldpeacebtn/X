import { Routes, Route } from "react-router-dom";
import HoloBackground from "./components/HoloBackground";
import NavBar from "./components/NavBar";

// Pages
import Auth from "./pages/Auth";
import Vault from "./pages/Vault";
import Upload from "./pages/Upload";
import FileView from "./pages/FileView";
import Share from "./pages/Share";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050b1a] text-white">

      {/* Hologram Universe Background */}
      <HoloBackground />

      {/* App Navigation */}
      <NavBar />

      {/* Routes */}
      <div className="relative z-10 p-6 md:p-10">
        <Routes>
          <Route path="/" element={<Vault />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/file/:id" element={<FileView />} />
          <Route path="/share/:tag" element={<Share />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
