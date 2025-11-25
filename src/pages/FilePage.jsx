import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

export default function FilePage() {
  const { id } = useParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = supabase.storage.from("vault").getPublicUrl(id);
      setUrl(data.publicUrl);
    };
    fetch();
  }, [id]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl mb-4">{id}</h1>
      <a className="text-blue-400 hover:underline" href={url} target="_blank" rel="noreferrer">
        Open / Download
      </a>
    </div>
  );
}
