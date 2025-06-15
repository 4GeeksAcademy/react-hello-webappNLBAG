import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalReducer";

export const Contacts = () => {
  const { contacts, actions } = useGlobalContext();

  useEffect(() => {
    actions.getContacts();
  }, [actions]);

  if (!Array.isArray(contacts)) {
    return <div className="text-center mt-5 text-danger">Error al cargar contactos.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contact List</h2>
        <Link to="/add-contact" className="btn btn-primary">Add Contact</Link>
      </div>

      {contacts.length === 0 ? (
        <p className="text-muted">No hay contactos disponibles.</p>
      ) : (
        <div className="list-group">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{contact.full_name}</span>
              <div>
                <Link
                  to={`/edit-contact/${contact.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => actions.deleteContact(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
