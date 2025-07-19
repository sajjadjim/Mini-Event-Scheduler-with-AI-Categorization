import React, { useContext, useState, useEffect, useRef } from 'react';
import {  AiOutlineMoon, AiOutlineSun } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router';

// import img1 from '../../assets/gjj.jpeg'

// Sidebar Component
const ProfileSidebar = () => {
//   const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profiles', icon: "👥", text: "See all profiles", isButton: true, className: "bg-gray-200 text-center font-medium py-2" },
    { id: 'business', icon: "◯", text: "Meta Business Suite", hasArrow: true },
    { id: 'settings', icon: "⚙️", text: "Settings & privacy", hasArrow: true },
    { id: 'help', icon: "❓", text: "Help & support", hasArrow: true },
    { id: 'display', icon: "🌙", text: "Display & accessibility", hasArrow: true },
    { id: 'feedback', icon: "💬", text: "Give feedback", subText: "CTRL B" },
    { id: 'logout', icon: "📤", text: "Log out" }
  ];


  return (
    <div className="w-80 rounded-lg shadow-lg bg-white overflow-hidden text-gray-800">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            {/* <img src={user.photoUrl || user.photoURL} alt="User profile" className="w-full h-full object-cover" /> */}
          </div>
          <div>
            <h3 className="font-medium text-gray-900"></h3>
            <p className="text-sm text-gray-600"></p>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-green-600 text-xl">🔔</span>
          <span className="text-sm">নতুন নতুন চাকুরি বিজ্ঞপ্তি 2025</span>
        </div>
      </div>

      <div className="py-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => console.log("Clicked")}
            className={`${
              item.isButton ? item.className : "px-4 py-3 hover:bg-gray-100 cursor-pointer"
            }  "bg-gray-50" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-500 w-6 text-center">{item.icon}</span>
                <div>
                  <span className="text-gray-800">{item.text}</span>
                  {item.subText && (
                    <div className="text-xs text-gray-500">{item.subText}</div>
                  )}
                </div>
              </div>
              {item.hasArrow && <span className="text-gray-400">›</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 text-xs text-gray-500 border-t border-gray-200">
        <div className="flex flex-wrap gap-x-1">
          <span>Privacy</span><span>·</span><span>Terms</span><span>·</span>
          <span>Advertising</span><span>·</span><span>Ad choices</span><span>›</span><span>·</span>
          <span>Cookies</span><span>·</span>
          <div className="flex flex-wrap">
            <span>More</span><span>·</span><span>Meta © 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme) {
        return localStorage.theme === 'dark';
      } else {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return false;
  });

//   const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);



  return (
    <nav className="text-white fixed top-0 left-0 w-full z-50">
      <div className=" mx-auto flex justify-between items-center bg-gray-900 dark:bg-gray-800 px-6 py-6 backdrop-blur-xl sticky top-0 relative overflow-visible  ">
        <div className="absolute inset-0 rounded-2xl pointer-events-none z-0">
          {/* <BorderBeam size={600} duration={20} colorFrom="#7A34F2" colorTo="#87CEEB" /> */}
        </div>

        <div className="flex items-center gap-4 z-10">
          <img className='w-20 cursor-pointer' src={""} alt="Logo" />
        </div>

        <ul className="hidden md:flex gap-6 text-lg z-10">
          <li><NavLink to="/" className={({ isActive }) => `block px-4 py-2 border-b border-purple-600 rounded-full transition ${isActive ? "bg-[#7A34F2] text-white" : ""}`}>Home</NavLink></li>
          <li><NavLink to="/add-task" className={({ isActive }) => `block px-4 py-2 border-b border-purple-600 rounded-full transition ${isActive ? "bg-[#7A34F2] text-white" : ""}`}>Add Task</NavLink></li>
          <li><NavLink to="/borujer" className={({ isActive }) => `block px-4 py-2 border-b border-purple-600 rounded-full transition ${isActive ? "bg-[#7A34F2] text-white" : ""}`}>Browse Tasks</NavLink></li>
          <li><NavLink to="/poste" className={({ isActive }) => `block px-4 py-2 border-b border-purple-600 rounded-full transition ${isActive ? "bg-[#7A34F2] text-white" : ""}`}>My Posted Tasks</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => `block px-4 py-2 border-b border-purple-600 rounded-full transition ${isActive ? "bg-[#7A34F2] text-white" : ""}`}>About</NavLink></li>
        </ul>

        <div className="relative flex gap-4 items-center z-10">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-purple-700 transition">
            {darkMode ? <AiOutlineSun size={22} /> : <AiOutlineMoon size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
