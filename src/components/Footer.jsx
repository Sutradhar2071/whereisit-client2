import React from "react";
import { CiTwitter } from "react-icons/ci";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

 const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <aside>
            <div className="flex items-center gap-2 mb-2">
              <img
                src="https://i.ibb.co/bgCktXkj/5654592.png"
                alt="Logo"
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-primary">WhereIsIt</span>
            </div>
            <p>Lost & Found Platform<br />Since 2025</p>
          </aside>

          {/* Quick Links */}
          <nav>
            <h6 className="footer-title">Quick Links</h6>
            <a className="link link-hover">Home</a> <br />
            <a className="link link-hover">Lost Items</a> <br />
            <a className="link link-hover">Add Item</a> <br />
            <a className="link link-hover">Recovered</a> <br />
          </nav>

          {/* Contact */}
          <nav>
            <h6 className="footer-title">Contact</h6>
            <a className="link link-hover">sutradharringku@gmail.com</a> <br />
            <a className="link link-hover">+880-1911041674</a> <br />
            <a className="link link-hover">Dhaka, Bangladesh</a>
          </nav>

          {/* Social */}
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="flex gap-4 mt-2 text-xl">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"><FaFacebookSquare /></i></a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"><CiTwitter /></i></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"><FaInstagramSquare /></i></a>
            </div>
          </nav>
        </div>

        {/* Bottom text */}
        <div className="text-center pt-6 mt-10 border-t border-base-300">
          <p>© 2025 WhereIsIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
 };

 export default Footer;