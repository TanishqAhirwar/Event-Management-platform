import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      setIsLogin(`${auth?.isAdmin}`);
      setUser(auth);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
    setUser(false);
    navigate("/login");
  };

  return (
    <div className="">
      <nav className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link className="text-2xl font-bold text-green-400" to="/">
          EventHive
        </Link>

        {/* Centered Nav Links */}
        <ul className="hidden md:flex space-x-8 font-medium absolute left-1/2 transform -translate-x-1/2">
          <li>
            <Link to="/" className="hover:text-green-400">
              Home
            </Link>
          </li>
          {user?.isAdmin ? (
            <li>
              <Link
                to="/admin/event/create-event"
                className="hover:text-green-400"
              >
                Create Event
              </Link>
            </li>
          ) : null}
          <li>
            <Link to="/events" className="hover:text-green-400">
              Events
            </Link>
          </li>

          <li>
            <Link to="/contact-us" className="hover:text-green-400">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Side Buttons */}
        <div className="ml-auto space-x-4 hidden md:flex">
          {isLogin ? (
            <>
              <Link
                to={user?.isAdmin ? "/admin/profile" : "/user/profile"}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-green-400 hover:bg-green-400 transition duration-300"
              >
                <img
                  src={user?.profilePic}
                  alt="User Avatar"
                  className="h-9 w-9 rounded-full object-cover"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-green-400 bg-green-400 text-black rounded cursor-pointer hover:bg-white hover:text-green-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border border-green-400 text-green-400 rounded hover:bg-green-400 hover:text-black transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 border border-green-400 bg-green-400 text-black rounded cursor-pointer hover:bg-white hover:text-green-600 transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
