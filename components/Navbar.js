"use client";
import { useState, useEffect } from "react";
import { FiActivity } from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xs" : "bg-transparent"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center sm:items-start">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-md">
            <FiActivity className="text-[#2554c7] bg-[#2554c7]/10 rounded-lg p-2 text-3xl sm:text-4xl" />
            <div className="flex flex-col">
              <span className="text-[#2554c7] font-bold text-2xl sm:text-3xl cursor-pointer">
                CSV Runner Dashboard
              </span>
              <span className="text-gray-500 text-sm md:text-base mt-1">
                Track and analyze running performance
              </span>
            </div>
          </div>
        </div>
      </div>

    </nav>

  );
};

export default Navbar;
