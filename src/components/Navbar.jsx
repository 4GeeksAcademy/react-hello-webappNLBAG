import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const { store, actions } = useGlobalReducer();

  return (
    <nav className={`navbar navbar-${store.darkMode ? "dark" : "light"} bg-${store.darkMode ? "dark" : "light"}`}>
      <div className="container">
        <span className="navbar-brand">📇 Contact App</span>
        <button className="btn btn-sm btn-outline-secondary" onClick={actions.toggleDarkMode}>
          {store.darkMode ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
