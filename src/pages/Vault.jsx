import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import FileCard from "../components/FileCard";

export default function Vault() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase.storage.from("vault").list();
      if (error) console.log("Supabase error:", error);
      else setFiles(data);
    };
    fetchFiles();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-4">Vault</h1>
      {files.length === 0 ? (
        <p>No files yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {files.map((file) => (
            <FileCard key={file.name} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}
