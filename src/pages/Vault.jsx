import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import FileCard from "../components/FileCard";

export default function Vault() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from("vault").list();
    if (error) console.log("Supabase error:", error);
    else setFiles(data);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const { error } = await supabase.storage.from("vault").upload(file.name, file, {
      upsert: true,
    });
    setUploading(false);

    if (error) console.log("Upload error:", error);
    else fetchFiles();
  };

  return (
    <div className="space-y-6 relative z-10">
      <h1 className="text-4xl font-bold text-center">Vault</h1>

      <div className="flex justify-center">
        <label className="cursor-pointer px-6 py-3 rounded-full bg-holoBlue hover:bg-holoPurple text-black font-bold">
          {uploading ? "Uploading..." : "Upload File"}
          <input type="file" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {files.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No files uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {files.map((file) => (
            <FileCard key={file.name} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}
