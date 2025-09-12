import { useState } from "react";
import { Link } from "react-router-dom";
import isAuthentication from '../services/auth'

export default function Nav({logoutUser}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link to="/dashboard" className="text-xl font-bold text-white">
            VIGNESH
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            {!isAuthentication()? <Link to="/sigup" className="hover:text-blue-400">
              Register
            </Link>:null}
            {!isAuthentication() ?<Link to="/login" className="hover:text-blue-400">
              Login
            </Link>:null}
            {isAuthentication() ?<Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>:null}
            {isAuthentication() ?<a href="#" onClick={logoutUser} className="hover:text-blue-400">
              Logout
            </a>:null}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className=" md:hidden bg-gray-800 px-4 py-3 space-y-2">
          {!isAuthentication()? <Link to="/sigup" className="hover:text-blue-400">
              Register
            </Link>:null}
            {!isAuthentication() ?<Link to="/login" className="hover:text-blue-400">
              Login
            </Link>:null }
            {isAuthentication() ?<Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>:null}
            {isAuthentication() ?<a href="#" onClick={logoutUser} className="hover:text-blue-400">
              Logout
            </a>:null}
        </div>
      )}
    </nav>
  );
}
