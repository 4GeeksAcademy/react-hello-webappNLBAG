import React, { useReducer, useContext, useEffect } from "react";

// Crea el contexto global
const GlobalContext = React.createContext();

// Estado inicial
const initialState = {
  contacts: []
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    default:
      return state;
  }
}

// Proveedor global
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const API_URL = "http://localhost:3001/contacts";

  // Obtener contactos
  const getContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      dispatch({ type: "SET_CONTACTS", payload: data });
    } catch (err) {
      console.error("❌ Error fetching contacts", err);
    }
  };

  // Añadir contacto
  const addContact = async (contact) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
      const data = await res.json();
      dispatch({ type: "ADD_CONTACT", payload: data });
    } catch (err) {
      console.error("❌ Error creating contact", err);
    }
  };

  // Borrar contacto
  const deleteContact = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (err) {
      console.error("❌ Error deleting contact", err);
    }
  };

  // Actualizar contacto
  const updateContact = async (id, contact) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
      });
      const data = await res.json();
      dispatch({ type: "UPDATE_CONTACT", payload: data });
    } catch (err) {
      console.error("❌ Error updating contact", err);
    }
  };

  // Carga inicial
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        contacts: state.contacts,
        actions: {
          getContacts,
          addContact,
          deleteContact,
          updateContact
        }
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para usar el contexto
export const useGlobalContext = () => useContext(GlobalContext);
