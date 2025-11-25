import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="relative z-20 w-full flex justify-center py-6">
      <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex gap-6">
        <Link to="/">Vault</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/auth">Login</Link>
      </div>
    </nav>
  );
}
