// src/hooks/useGlobalReducer.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Creamos contexto global
const GlobalContext = createContext();

// Estado inicial
const initialState = { contacts: [] };

// Reducer para manejar estado de contacts
function reducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        )
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    default:
      return state;
  }
}

// Proveedor de estado global usando localStorage
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Carga inicial desde localStorage
  const loadContacts = () => {
    try {
      const stored = localStorage.getItem("contacts");
      const data = stored ? JSON.parse(stored) : [];
      dispatch({ type: "SET_CONTACTS", payload: data });
    } catch (err) {
      console.error("❌ Error loading contacts", err);
    }
  };

  // Guarda en localStorage
  const persist = contacts => {
    try {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } catch (err) {
      console.error("❌ Error saving contacts", err);
    }
  };

  // Acciones CRUD sin backend
  const actions = {
    getContacts: () => loadContacts(),

    addContact: contact => {
      const newContact = { ...contact, id: Date.now().toString() };
      const updated = [...state.contacts, newContact];
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      persist(updated);
    },

    updateContact: (id, data) => {
      const updated = state.contacts.map(c =>
        c.id === id ? { ...c, ...data } : c
      );
      dispatch({ type: "UPDATE_CONTACT", payload: { id, ...data } });
      persist(updated);
    },

    deleteContact: id => {
      const updated = state.contacts.filter(c => c.id !== id);
      dispatch({ type: "DELETE_CONTACT", payload: id });
      persist(updated);
    }
  };

  // useEffect para cargar datos al inicio
  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <GlobalContext.Provider value={{ contacts: state.contacts, actions }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para usar contexto
export const useGlobalContext = () => useContext(GlobalContext);
