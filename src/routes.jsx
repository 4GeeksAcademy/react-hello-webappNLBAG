import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not Found</h1>}>
      <Route index element={<Home />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="add-contact" element={<AddContact />} />
      <Route path="edit-contact/:id" element={<AddContact />} />
    </Route>
  )
);
