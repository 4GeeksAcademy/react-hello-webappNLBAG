import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
