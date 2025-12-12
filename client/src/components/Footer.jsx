import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiLock, FiFileText, FiCoffee } from "react-icons/fi";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import DocAppLogo from "../assets/DocAppLogo.png";



const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden">
                   <img src={DocAppLogo} alt="DocApp Logo" className="w-full h-full object-cover" />
              </div>

              <span className="text-xl font-bold text-white">
                Health<span className="text-blue-400">Care</span>Pro
              </span>
            </Link>

            <p className="text-gray-400 text-sm">
              Your trusted platform for booking appointments with top healthcare professionals. Quality care, made accessible.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                <FaFacebook className="text-xl" />
              </a>

              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                <FaXTwitter className="text-xl" />
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                <FaInstagram className="text-xl" />
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all hover:-translate-y-1">
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">Home</Link></li>
              <li><Link to="/all-doctors" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">Find Doctors</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">About Us</Link></li>
              <li><Link to="/appointments" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">Appointments</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/all-doctors" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">Find Specialists</Link></li>
              <li><Link to="/all-doctors" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">Book Appointment</Link></li>
              <li><Link to="/appointments" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">Manage Appointments</Link></li>
              <li><Link to="/my-profile" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">My Profile</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo(0, 0)} className="text-gray-400 hover:text-blue-400 text-sm">About Platform</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
         {/* Contact Info */}
<div>
  <h3 className="text-white font-semibold mb-4">Contact Us</h3>
  <ul className="space-y-3">
    <li className="flex items-start space-x-3 text-sm">
      <FiMail className="text-blue-400 text-lg mt-0.5" />
      <a 
        href="mailto:support@healthcarepro.com" 
        className="text-gray-400 hover:text-blue-400 transition-colors"
      >
        support@healthcarepro.com
      </a>
    </li>

    <li className="flex items-start space-x-3 text-sm">
      <FiPhone className="text-blue-400 text-lg mt-0.5" />
      <a 
        href="tel:+1234567890" 
        className="text-gray-400 hover:text-blue-400 transition-colors"
      >
        +1 (234) 567-890
      </a>
    </li>

    <li className="flex items-start space-x-3 text-sm">
      <FiMapPin className="text-blue-400 text-lg mt-0.5" />
      <span className="text-gray-400">
        123 Healthcare Ave, Medical District, NY 10001
      </span>
    </li>
  </ul>
</div>


        </div>

        {/* Bottom Bar */}
       {/* Bottom Bar */}
<div className="mt-12 pt-8 border-t border-gray-700">
  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

    <p className="text-gray-400 text-sm">
      © {currentYear} HealthCare Pro. All rights reserved.
    </p>

    <div className="flex space-x-8">
      
      <Link 
        to="/" 
        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
      >
        <FiLock className="text-lg" />
        Privacy Policy
      </Link>

      <Link 
        to="/" 
        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
      >
        <FiFileText className="text-lg" />
        Terms of Service
      </Link>

      <Link 
        to="/" 
        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
      >
        <FiCoffee className="text-lg" />
        Cookie Policy
      </Link>

    </div>
  </div>
</div>


      </div>
    </footer>
  );
};

export default Footer;
