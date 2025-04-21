import React from "react";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="container mt-5">
      <h1>🎉 Página de Demo</h1>
      <p>Este es un componente de demostración. Podés usarlo para probar el enrutamiento o componentes nuevos.</p>
      
      <Link to="/" className="btn btn-primary mt-3">Volver a inicio</Link>
    </div>
  );
};

export default Demo;
