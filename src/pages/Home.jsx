import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { store, actions } = useGlobalReducer();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    actions.loadContacts(); // Cargar contactos al montar
  }, []);

  const filteredContacts = Array.isArray(store.contacts)
  ? store.contacts.filter((contact) => {
      const term = searchTerm.toLowerCase();
      return (
        contact.full_name.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term) ||
        contact.phone.toLowerCase().includes(term)
      );
    })
  : [];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>📇 Contactos</h1>
        <Link to="/add-contact" className="btn btn-primary">
          ➕ Nuevo contacto
        </Link>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Buscar por nombre, email o teléfono..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredContacts.length === 0 ? (
        <p>No hay contactos que coincidan.</p>
      ) : (
        filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={() => actions.deleteContact(contact.id)}
          />
        ))
      )}
    </div>
  );
};

export default Home;
