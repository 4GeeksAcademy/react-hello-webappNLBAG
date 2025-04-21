import React, { createContext, useState, useEffect, useContext } from "react";
import getState from "./flux.jsx";

// Crear el contexto global
export const Context = createContext(null);

// Componente que envuelve toda la app con el contexto
export const ContextWrapper = ({ children }) => {
  const [state, setState] = useState(() =>
    getState({
      getStore: () => state.store,
      getActions: () => state.actions,
      setStore: (updatedStore) =>
        setState((prev) => ({
          store: { ...prev.store, ...updatedStore },
          actions: prev.actions,
        })),
    })
  );

  // Cargar contactos al montar (si existe loadContacts)
  useEffect(() => {
    if (state.actions && typeof state.actions.loadContacts === "function") {
      state.actions.loadContacts();
    }
  }, [state.actions]);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};

// Hook personalizado para usar el contexto en cualquier componente
export const useAppContext = () => useContext(Context);
