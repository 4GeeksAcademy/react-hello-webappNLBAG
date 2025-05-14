
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home.jsx";
import AddContact from "./pages/AddContact.jsx"; // 
import Single from "./pages/Single";
import Demo from "./pages/Demo";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>

      <Route path="/" element={<Home />} />
      <Route path="/add-contact" element={<AddContact />} /> 
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      
    </Route>
  )
);
