import { Bell, MenuIcon } from "lucide-react";
import React, { useState } from "react";

function MenuLink({ label, sectionId, active, onClick }) {
  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
        onClick();
      }}
      className={`${
        active
          ? "border-[#4299E1] text-white"
          : "border-transparent text-gray-300"
      } hover:border-gray-300 lg:border-b-2 md:border-l-0 border-l-2 md:hover:border-gray-300 px-1 pt-1 font-medium `}
    >
      {label}
    </a>
  );
}

function Menu({ show }) {
  const [link, setLink] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const links = [
    { label: "Home", id: "Hero" },
    { label: "Features", id: "Features" },
    { label: "AI Info", id: "info" },
    { label: "Live Check", id: "Live Check" },
  ];

  const handleLinkClick = (index) => {
    setLink(index);
    setShowMenu(false); // Fermer le menu mobile après clic
  };

  return (
    <nav className="bg-[#1A365D] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <i className="fas fa-shield-alt text-[#4299E1] text-2xl mr-2"></i>
            <span className="font-bold text-xl">SafetyAI</span>
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex md:space-x-8">
            {links.map((linkObj, i) => (
              <MenuLink
                key={i}
                label={linkObj.label}
                sectionId={linkObj.id}
                active={link === i}
                onClick={() => handleLinkClick(i)}
              />
            ))}
          </div>
          {/* Hamburger for mobile */}
          <div className="flex">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden  text-gray-300 hover:text-white p-2"
            >
              <MenuIcon />
            </button>
            <div className="hover:bg-gray-500 p-3 rounded-2xl " onClick={show}>
              <Bell />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-2">
            {links.map((linkObj, i) => (
              <MenuLink
                key={i}
                label={linkObj.label}
                sectionId={linkObj.id}
                active={link === i}
                onClick={() => handleLinkClick(i)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Menu;
