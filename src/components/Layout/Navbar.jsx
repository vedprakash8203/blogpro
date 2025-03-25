import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="text-xl font-bold text-gray-800">
            <NavLink to="/">BlogHub</NavLink>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-bold border-b-2 border-red-600 pb-1 transition-all"
                    : "text-gray-700 hover:text-gray-900 transition-all"
                }
              >
                Home
              </NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-600 font-bold border-b-2 border-red-600 pb-1 transition-all"
                        : "text-gray-700 hover:text-gray-900 transition-all"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create-blog"
                    className={({ isActive }) =>
                      isActive
                        ? "text-red-600 font-bold border-b-2 border-red-600 pb-1 transition-all"
                        : "text-gray-700 hover:text-gray-900 transition-all"
                    }
                  >
                    Write Blog
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-all"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-all"
                        : "bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-all"
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-all"
                        : "bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300 transition-all"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 border-t border-gray-200">
            <ul className="pt-2 space-y-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block text-red-600 font-bold border-l-4 border-red-600 pl-2"
                      : "block text-gray-700 hover:text-gray-900 pl-2"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              {user ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-red-600 font-bold border-l-4 border-red-600 pl-2"
                          : "block text-gray-700 hover:text-gray-900 pl-2"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/create-blog"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-red-600 font-bold border-l-4 border-red-600 pl-2"
                          : "block text-gray-700 hover:text-gray-900 pl-2"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Write Blog
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left bg-red-600 text-white px-4 py-2 rounded-md font-medium"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? "block bg-red-600 text-white px-4 py-2 rounded-md font-medium"
                          : "block bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive
                          ? "block bg-red-600 text-white px-4 py-2 rounded-md font-medium"
                          : "block bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
