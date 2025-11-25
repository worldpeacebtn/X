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
    <div style={{ color: "white", fontSize: 40, padding: 40 }}>
      🔥 App is working!
    </div>
  );
}

