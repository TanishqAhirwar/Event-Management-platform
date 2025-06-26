import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-green-500 mb-2">EventHive</h2>
          <p className="text-sm text-gray-400">
            Discover and create amazing events near you. Making every moment count, one event at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-500">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-green-400">Home</a></li>
            <li><a href="/events" className="hover:text-green-400">Events</a></li>
            <li><a href="/create-event" className="hover:text-green-400">Create Event</a></li>
            <li><a href="/contact" className="hover:text-green-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-500">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@EventHive.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: New Delhi, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-500">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-green-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-400"><FaTwitter /></a>
            <a href="#" className="hover:text-green-400"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} EventHive. All rights reserved.
      </div>
    </footer>
  );
}
