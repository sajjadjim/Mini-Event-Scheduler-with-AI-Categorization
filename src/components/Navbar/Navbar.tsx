import React, { useState, useEffect, useRef } from "react";
import {  AiOutlineMenu, AiOutlineUser } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

const Navbar: React.FC = () => {
  const auth = useAuth();
  const user = auth?.user;
  const logOut = auth?.logOut;
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);


  const handleLogout = async () => {
    try {
      if (logOut) {
        await logOut();
      }
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 text-white">
      <div className="mx-auto flex justify-between items-center bg-gray-900 dark:bg-gray-800 px-6 py-6 backdrop-blur-xl relative overflow-visible">
        {/* Logo */}
        <div className="flex items-center gap-4 z-10">
          <p className="text-2xl 2xl:text-3xl font-bold">Event Scheduler</p>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 text-lg z-10">
            {[
            { to: "/", label: "Home" },
            { to: "/browser_task", label: "Browse Tasks" },
            // Only show these if user is logged in
            ...(user
              ? [
                { to: "/add_items", label: "Add Task" },
                { to: "/my_task", label: "My Posted Tasks" },
              ]
              : []),
            { to: "/about", label: "About" },
            ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
              to={to}
              className={({ isActive }) =>
                `block px-4 py-2 border-b border-purple-600 rounded-full transition ${
                isActive ? "bg-[#7A34F2] text-white" : ""
                }`
              }
              >
              {label}
              </NavLink>
            </li>
            ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4 z-10">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-purple-700 transition"
            onClick={() => setMobileMenuOpen(true)}
          >
            <AiOutlineMenu size={24} />
          </button>

          {/* User Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div className="relative group">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="p-2 rounded-full bg-purple-700 hover:bg-purple-600 transition"
                >
                  <AiOutlineUser size={22} />
                </button>
                <span className="absolute hidden group-hover:block bg-gray-700 text-sm px-2 py-1 rounded left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap">
                  {user.email}
                </span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-2 z-20">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-700"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="px-4 py-2 bg-purple-700 rounded-full hover:bg-purple-600 transition"
            >
              Join Us
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0  bg-opacity-70 z-50 flex justify-end">
          <div className="w-64 bg-gray-900 p-6">
            <button
              className="mb-6 text-white cursor-pointer hover:text-purple-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Close
            </button>
            <ul className="flex flex-col gap-4 text-lg">
              {[
                { to: "/", label: "Home" },
                { to: "/add_items", label: "Add Task" },
                { to: "/browser_task", label: "Browse Tasks" },
                { to: "/poste", label: "My Posted Tasks" },
                { to: "/about", label: "About" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-md transition ${
                        isActive ? "bg-[#7A34F2] text-white" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
