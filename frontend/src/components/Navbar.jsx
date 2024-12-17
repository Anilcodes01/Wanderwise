import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  LogOut,
  Compass,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";

export default function Navbar({ onLogout, userRole }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white w-full px-2 shadow-md sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4 relative">
        <Link
          to="/home"
          className="flex items-center text-2xl gap-2 font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          <Compass className="text-blue-600" size={32} />
          <span>WanderWise</span>
        </Link>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/home"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-all group"
          >
            <LayoutDashboard
              className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors mr-1"
            />
            <span>Home</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-all group"
          >
            <CheckSquare
              className="h-5 text-gray-500 group-hover:text-blue-600 transition-colors mr-1"
            />
            <span>Profile</span>
          </Link>

          {userRole === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center text-green-700 hover:text-green-800 transition-all group"
            >
              <ShieldCheck
                className="h-5 text-green-600 group-hover:text-green-700 transition-colors mr-1"
              />
              <span>Admin</span>
            </Link>
          )}

          <button
            onClick={onLogout}
            className="flex items-center text-red-500 hover:text-red-600 transition-all group"
          >
            <LogOut
              className="h-5 text-red-500 group-hover:text-red-600 transition-colors mr-1"
            />
            <span>Logout</span>
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <div className="flex flex-col items-start p-4 space-y-2">
              <Link
                to="/home"
                onClick={closeMenu}
                className="flex items-center w-full text-gray-700 hover:text-blue-600 transition-all group"
              >
                <LayoutDashboard
                  className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors mr-2"
                />
                <span>Home</span>
              </Link>

              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center w-full text-gray-700 hover:text-blue-600 transition-all group"
              >
                <CheckSquare
                  className="h-5 text-gray-500 group-hover:text-blue-600 transition-colors mr-2"
                />
                <span>Profile</span>
              </Link>

              {userRole === 'admin' && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="flex items-center w-full text-green-700 hover:text-green-800 transition-all group"
                >
                  <ShieldCheck
                    className="h-5 text-green-600 group-hover:text-green-700 transition-colors mr-2"
                  />
                  <span>Admin</span>
                </Link>
              )}

              <button
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                className="flex items-center w-full text-red-500 hover:text-red-600 transition-all group"
              >
                <LogOut
                  className="h-5 text-red-500 group-hover:text-red-600 transition-colors mr-2"
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}