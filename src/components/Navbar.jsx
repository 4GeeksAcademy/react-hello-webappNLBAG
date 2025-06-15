import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Contact Manager</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/") ? "active" : ""}`} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/contacts") ? "active" : ""}`} to="/contacts">
              Contacts
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${isActive("/add-contact") ? "active" : ""}`} to="/add-contact">
              Add Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
