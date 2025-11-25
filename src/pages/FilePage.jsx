import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

export default function FilePage() {
  const { id } = useParams(); // file name
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      const { data, error } = supabase.storage
        .from("vault")
        .getPublicUrl(id);
      if (error) console.log(error);
      else setFileUrl(data.publicUrl);
    };
    fetchFile();
  }, [id]);

  if (!fileUrl) return <p className="text-white p-10">Loading file...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-white mb-4">{id}</h1>
      <a
        href={fileUrl}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 underline"
      >
        Download / Preview
      </a>
    </div>
  );
}
