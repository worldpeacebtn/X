import React from "react";
import { useParams } from "react-router-dom";

export default function Share() {
  const { tag } = useParams();
  return <h1>Public Share Tag: {tag}</h1>;
}
