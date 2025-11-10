"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll background logic
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
  className={`fixed top-0 w-full z-50 border-b border-gray-200 shadow-sm transition-all duration-500 ${
    scrolled ? "bg-white/80 backdrop-blur-xs" : "bg-transparent"
  }`}
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 max-w-7xl mx-auto">
  {/* Logo */}
  <div className="flex flex-col items-center sm:items-start">
    <span className="text-[#2554c7] font-bold text-2xl sm:text-3xl cursor-pointer">
      CSV Runner Dashboard
    </span>
    <span className="text-gray-500 text-sm md:text-base text-center sm:text-left">
      Track and analyze running performance
    </span>
  </div>
</div>

</nav>

  );
};

export default Navbar;
