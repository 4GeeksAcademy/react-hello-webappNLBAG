import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const ContactCard = ({ contact, onDelete }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowModal(false);
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5>{contact.full_name}</h5>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Teléfono:</strong> {contact.phone}</p>
            <p><strong>Dirección:</strong> {contact.address}</p>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => navigate("/add-contact", { state: { contact } })}
            >
              ✏️ Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowModal(true)}
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default ContactCard;
