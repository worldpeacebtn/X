import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

export default function FilePage() {
  const { id } = useParams();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      // get a signed or public URL — adjust based on your bucket permissions
      const { data, error } = supabase
        .storage
        .from("vault")
        .getPublicUrl(id);
      if (error) {
        console.error("Error getting file URL:", error);
      } else {
        setUrl(data.publicUrl);
      }
    };
    fetch();
  }, [id]);

  if (!url) return <div className="p-8 text-white">Loading…</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold">{id}</h1>
      <a href={url} target="_blank" rel="noreferrer" className="text-blue-400 underline">
        Open / Download file
      </a>
    </div>
  );
}
