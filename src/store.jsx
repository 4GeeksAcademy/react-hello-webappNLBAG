import React, { createContext, useState, useEffect, useContext } from "react";
import getState from "./flux.jsx";

export const Context = createContext(null);

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

export const useAppContext = () => useContext(Context);
