import React from "react";

export default function FileCard({ file }) {
  return (
    <div className="card hover:scale-105 transition-transform">
      <h2 className="text-lg font-semibold truncate">{file.name}</h2>
      <a
        href={`https://YOUR_SUPABASE_URL/storage/v1/object/public/vault/${file.name}`}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-blue-400 hover:underline"
      >
        Preview
      </a>
    </div>
  );
}
