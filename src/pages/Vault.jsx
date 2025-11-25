import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";

export default function Vault() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from("vault").list();
    if (error) console.error(error);
    else setFiles(data);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { error } = await supabase.storage.from("vault").upload(file.name, file, { upsert: true });
    setUploading(false);
    if (!error) fetchFiles();
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-white text-center mb-6">Vault</h1>

      {/* Upload Button */}
      <div className="flex justify-center mb-6">
        <label className="cursor-pointer px-6 py-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-black font-bold shadow-lg hover:shadow-neon hover:scale-105 transition-all duration-300">
          {uploading ? "Uploading..." : "Upload File"}
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {/* File list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {files.map((file) => (
          <div key={file.name} className="p-4 bg-white/5 border border-white/10 rounded backdrop-blur shadow-md">
            <h2 className="text-lg font-semibold truncate">{file.name}</h2>
            <a
              href={`/file/${file.name}`}
              className="mt-2 inline-block text-blue-400 hover:underline"
            >
              Preview
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
