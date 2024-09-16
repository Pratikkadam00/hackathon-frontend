import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-violet-500 text-white py-4 flex justify-center items-center">
      <p className="text-sm sm:text-base">
        © {currentYear} Evento. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
