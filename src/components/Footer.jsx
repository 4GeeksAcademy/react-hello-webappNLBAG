import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <small>
          Made with 💙 by NachoLBAG — {new Date().getFullYear()}
        </small>
      </div>
    </footer>
  );
};
