import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";

export default function Vault() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    supabase.storage.from("vault").list().then(({ data, error }) => {
      if (error) console.error(error);
      else setFiles(data);
    });
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl text-white">Vault</h1>
      {files.length === 0 && <p className="text-gray-400">No files yet.</p>}
      {files.map((file) => (
        <div key={file.name} className="border border-gray-600 p-4 rounded">
          <div className="text-white">{file.name}</div>
          <Link to={`/file/${file.name}`} className="text-blue-400 hover:underline">
            Preview / Download
          </Link>
        </div>
      ))}
    </div>
  );
}
