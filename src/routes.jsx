// Import necessary components and functions from react-router-dom
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home.jsx";
import AddContact from "./pages/AddContact.jsx"; // ✅ AÑADIDO
import Single from "./pages/Single";
import Demo from "./pages/Demo";

// Create the router
export const router = createBrowserRouter(
  createRoutesFromElements(
    // Root route
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      {/* Sub-routes inside Layout */}
      <Route path="/" element={<Home />} />
      <Route path="/add-contact" element={<AddContact />} /> {/* ✅ NUEVA RUTA */}
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      
    </Route>
  )
);
