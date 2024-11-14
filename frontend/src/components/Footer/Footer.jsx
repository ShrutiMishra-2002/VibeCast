import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-[#2F2E41] text-gray-200 py-10 relative bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Footer Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About VibeCast</h2>
            <p className="text-gray-400">
              VibeCast is your go-to platform for exploring and sharing podcasts across various genres. Tune in, discover, and share your vibes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              {/* <li><refer app.jsx */}
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link to="/all-podcasts" className="hover:text-white">All Podcasts</Link></li>
              <li><Link href="/profile" className="hover:text-white">Profile</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">Have questions or feedback? Reach out to us!</p>
            <ul className="mt-4 space-y-2">
              <li>Email: <a href="mailto:shrutidmishra2002@gmail.com" className="hover:text-white">shrutidmishra2002@gmail.com</a></li>
              <li>Phone: +123 456 7890</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-gray-500 my-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <p>&copy; 2024 Shruti Mishra. All rights reserved.</p>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
