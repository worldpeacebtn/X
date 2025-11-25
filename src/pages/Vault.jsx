import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import FileCard from "../components/FileCard";

export default function Vault() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.storage.from("vault").list();
    setFiles(data || []);
  };

  return (
    <div>
      <h1 className="text-4xl mb-6">Your Holo Vault</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {files.map((f) => (
          <FileCard file={f} key={f.name} />
        ))}
      </div>
    </div>
  );
}
