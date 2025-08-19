import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#061F21]  text-white pt-14">
      {/* Wave curve */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
      
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Job Portal */}
        <div>
          <h2 className="text-xl font-bold mb-4">Job Portal</h2>
          <p className="text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore accumsan lacus vel facilisis.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Services</li>
            <li>News & Blog</li>
            <li>Our Features</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> 456, Tredy Road, New York, USA, MD 210093</li>
            <li className="flex items-center gap-2"><FaEnvelope /> hr@gmail.com</li>
            <li className="flex items-center gap-2"><FaPhone /> +61-5869259325</li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="E-mail Address"
              className="w-full px-4 py-2 rounded-l bg-[#1C2038] text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-[#00CFE8] px-4 flex items-center justify-center rounded-r hover:bg-cyan-400">
              <FaPaperPlane className="text-white" />
            </button>
          </div>
          <div className="flex space-x-3">
            <FaFacebookF className="w-8 h-8 p-2 bg-[#1C2038] rounded-full hover:bg-[#00CFE8] cursor-pointer" />
            <FaTwitter className="w-8 h-8 p-2 bg-[#1C2038] rounded-full hover:bg-[#00CFE8] cursor-pointer" />
            <FaInstagram className="w-8 h-8 p-2 bg-[#1C2038] rounded-full hover:bg-[#00CFE8] cursor-pointer" />
            <FaYoutube className="w-8 h-8 p-2 bg-[#1C2038] rounded-full hover:bg-[#00CFE8] cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 pb-6">
        &copy; 2025 Job Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;