import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const AddContact = () => {
  const { actions } = useGlobalReducer();
  const navigate = useNavigate();
  const location = useLocation();

  const editingContact = location.state?.contact || null;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (editingContact) {
      setFormData({
        full_name: editingContact.full_name,
        email: editingContact.email,
        phone: editingContact.phone,
        address: editingContact.address
      });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (editingContact) {
      await actions.editContact(editingContact.id, formData);
    } else {
      await actions.addContact(formData);
    }
  
    // Redirige al Home después de crear o editar un contacto
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>{editingContact ? "✏️ Editar Contacto" : "➕ Nuevo Contacto"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre completo</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          {editingContact ? "💾 Guardar Cambios" : "📤 Crear Contacto"}
        </button>
      </form>
    </div>
  );
};

export default AddContact;
