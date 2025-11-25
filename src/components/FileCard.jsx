import React from "react";

export default function FileCard({ file }) {
  return (
    <div className="card">
      <h2 className="text-lg font-semibold truncate">{file.name}</h2>
      <a
        href={`https://poiwwrnhyiztaadlpuiq/storage/v1/object/public/vault/${file.name}`}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-holoBlue hover:underline"
      >
        Preview
      </a>
    </div>
  );
}
