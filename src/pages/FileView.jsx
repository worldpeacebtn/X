import { useParams } from "react-router-dom";

export default function FileView() {
  const { id } = useParams();

  return <h1>Preview for file: {id}</h1>;
}
