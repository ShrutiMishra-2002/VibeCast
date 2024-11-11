import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { GiOldMicrophone } from 'react-icons/gi';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get login state from Redux
  const [MobileNav, setMobileNav] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'All Podcasts', path: '/all-podcasts' },
  ];

  return (
    <nav className="px-4 md:px-8 lg:px-12 py-4 relative shadow-md bg-white">
      <div className="flex items-center justify-between">
        {/* Logo and branding */}
        <div className="logo brand-name flex items-center gap-3">
          <IconContext.Provider value={{ size: '35px' }}>
            <GiOldMicrophone />
          </IconContext.Provider>
          <Link to="/" className="text-xl font-bold">VibeCast</Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((item, i) => (
            <Link 
              key={i} 
              to={item.path} 
              className="text-xl font-semibold hover:text-[#2F2E41]"
            >
              {item.name}
            </Link>
          ))}
          

        </div>
        {/* Show Profile link only if logged in */}
          {isLoggedIn && (
            <Link to="/profile" className="hidden lg:block px-6 py-2 text-lg border rounded-full bg-[#4C4B5F] font-semibold text-white hover:bg-[#2F2E41]">
              Profile
            </Link>
          )}

        {/* Desktop Login & Signup Buttons */}
        {!isLoggedIn && (
          <div className="hidden lg:flex space-x-4">
            <Link to="/login" className="px-6 py-2 text-lg border border-[#2F2E41] text-[#2F2E41] rounded-full">
              Login
            </Link>
            <Link to="/signup" className="px-6 py-2 text-lg bg-[#2F2E41] text-white rounded-full">
              Signup
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMobileNav(!MobileNav)} className="text-3xl">
            {MobileNav ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-[#C7D2FE] font-semibold text-[#2F2E41] hover:text-[#2F2E41] z-50 transform ${
          MobileNav ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-between">
          {/* Menu Title with Logo */}
          <div className="flex items-center gap-2">
            <IconContext.Provider value={{ size: '35px' }}>
              <GiOldMicrophone />
            </IconContext.Provider>
            <div className="text-2xl font-bold">Menu</div>
          </div>
          <button onClick={() => setMobileNav(false)} className="text-3xl">
            <RxCross2 />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 mt-12">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setMobileNav(false)}
              className="text-xl font-semibold w-full text-center"
            >
              {item.name}
            </Link>
          ))}

          {/* Show Profile link only if logged in */}
          {isLoggedIn && (
            <Link
              to="/profile"
              onClick={() => setMobileNav(false)}
              className="text-xl font-semibold w-full text-center"
            >
              Profile
            </Link>
          )}

          {/* Show Login and Signup links if not logged in */}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                onClick={() => setMobileNav(false)}
                className="text-xl font-semibold w-full text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileNav(false)}
                className="text-xl font-semibold w-full text-center"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
