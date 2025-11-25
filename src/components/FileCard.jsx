import React from "react";

export default function HoloCard({ children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:scale-105 transform transition-all duration-300">
    
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
