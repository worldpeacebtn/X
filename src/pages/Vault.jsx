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
    if (!error) setFiles(data);
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
    <div className="p-8">
      <h1 className="text-white text-3xl mb-6">Vault</h1>
      <label className="cursor-pointer px-6 py-3 bg-blue-500 text-black rounded mr-4">
        {uploading ? "Uploading..." : "Upload File"}
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>
      <div className="mt-6 space-y-4">
        {files.map((file) => (
          <div key={file.name} className="p-4 bg-white/5 border border-white/10 rounded">
            <div className="text-white">{file.name}</div>
            <a className="text-blue-400 hover:underline" href={`/file/${file.name}`}>
              Preview / Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
