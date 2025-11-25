import React from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

export default function FileView() {
  const { id } = useParams();
  // fetch and display file logic
  return <div>File: {id}</div>;
}
