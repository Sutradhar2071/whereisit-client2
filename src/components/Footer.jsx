import React from "react";
import { CiTwitter } from "react-icons/ci";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://i.ibb.co/bgCktXkj/5654592.png"
                alt="Logo"
                className="w-12 h-12"
              />
              <span className="text-2xl font-bold text-primary">WhereIsIt</span>
            </div>
            <p className="text-sm text-gray-500">
              Your trusted Lost & Found platform <br /> Serving Bangladesh since 2025
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h6 className="text-lg font-semibold mb-3 text-primary">Quick Links</h6>
            <ul className="space-y-2 text-sm">
              <li><a className="hover:text-primary duration-200" href="/">Home</a></li>
              <li><a className="hover:text-primary duration-200" href="/lost-found-items">Lost & Found Items</a></li>
              <li><a className="hover:text-primary duration-200" href="/add-item">Add Item</a></li>
              <li><a className="hover:text-primary duration-200" href="/recovered-items">Recovered</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="text-lg font-semibold mb-3 text-primary">Contact</h6>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:sutradharringku@gmail.com" className="hover:text-primary duration-200">sutradharringku@gmail.com</a></li>
              <li><a href="tel:+8801911041674" className="hover:text-primary duration-200">+880-1911-041674</a></li>
              <li className="text-gray-500">Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h6 className="text-lg font-semibold mb-3 text-primary">Follow Us</h6>
            <div className="flex gap-5 text-2xl">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors"
              >
                <CiTwitter />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagramSquare />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-base-300 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="font-semibold text-primary">WhereIsIt</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
