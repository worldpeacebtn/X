import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import HoloCard from "../components/HoloCard";
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
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-white text-center mb-4">Vault</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {files.map((file) => (
          <HoloCard key={file.name}>
            <h2 className="text-lg font-semibold truncate">{file.name}</h2>
            <Link
              to={`/file/${file.name}`}
              className="mt-2 inline-block text-blue-400 hover:underline"
            >
              Preview / Download
            </Link>
          </HoloCard>
        ))}
      </div>
    </div>
  );
}
