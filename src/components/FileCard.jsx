import React from "react";
import { Link } from "react-router-dom";

export default function FileCard({ file }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded p-4 backdrop-blur shadow-md">
      <h2 className="text-lg font-semibold truncate">{file.name}</h2>
     <Link
       to={`/file/${file.name}`}
        className="mt-2 inline-block text-blue-400 hover:underline"
      >
        Preview
      </Link>
  Preview
</a>

    </div>
  );
}
