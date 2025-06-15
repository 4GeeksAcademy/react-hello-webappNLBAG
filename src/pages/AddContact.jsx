import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalReducer";

export const AddContact = () => {
  const { id } = useParams(); // Si hay id, estamos editando
  const navigate = useNavigate();
  const { contacts, actions } = useGlobalContext();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const existing = contacts.find((c) => c.id == id);
      if (existing) {
        setFormData({
          full_name: existing.full_name || "",
          email: existing.email || "",
          phone: existing.phone || "",
          address: existing.address || "",
        });
      }
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await actions.updateContact(id, formData);
    } else {
      await actions.addContact(formData);
    }

    navigate("/contacts");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Contact" : "Add New Contact"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
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
          <label className="form-label">Email</label>
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
          <label className="form-label">Phone</label>
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
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update Contact" : "Save Contact"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/contacts")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
