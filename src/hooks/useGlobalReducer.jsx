import { useContext } from "react";
import { Context } from "../store.jsx";

const useGlobalReducer = () => {
  const { store, actions } = useContext(Context);
  return { store, actions };
};

export default useGlobalReducer;
