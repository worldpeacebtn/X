import { useState } from "react";
import supabase from "../supabaseClient";

export default function Upload() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return;

    await supabase.storage.from("vault").upload(`${Date.now()}-${file.name}`, file);
    alert("Uploaded!");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
      <button onClick={upload} className="p-3 bg-blue-600 rounded">
        Upload
      </button>
    </div>
  );
}
