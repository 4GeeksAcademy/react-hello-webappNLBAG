import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <strong>{contact.full_name}</strong>
        <div className="text-muted small">{contact.email} | {contact.phone}</div>
      </div>
      <div>
        <Link
          to={`/edit-contact/${contact.id}`}
          className="btn btn-warning btn-sm me-2"
        >
          Edit
        </Link>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(contact.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
