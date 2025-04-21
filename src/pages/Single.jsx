import React from "react";
import { useParams, Link } from "react-router-dom";

const Single = () => {
  const { theId } = useParams();

  return (
    <div className="container mt-5">
      <h1>📄 Vista Detallada</h1>
      <p>ID recibido en la URL: <strong>{theId}</strong></p>

      <Link to="/" className="btn btn-primary mt-3">Volver a inicio</Link>
    </div>
  );
};

export default Single; 