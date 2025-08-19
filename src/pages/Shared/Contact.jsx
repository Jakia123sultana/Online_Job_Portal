import React from "react";
import { FiMessageCircle } from "react-icons/fi";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="max-w-6xl w-full mx-auto px-10 py-12 grid md:grid-cols-2 gap-16">
        {/* Left: Contact Form */}
        <div>
          <h1 className="text-3xl font-bold mb-4 text-white">Contact Our Team</h1>
          <p className="text-gray-300 mb-6">
            Got any questions about the product or scaling on our platform?
            We’re here to help. Chat to our friendly team 24/7 and get onboard
            in less than 5 minutes.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="border border-gray-500 bg-gray-800 text-white p-3 rounded w-full"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-gray-500 bg-gray-800 text-white p-3 rounded w-full"
              />
            </div>

            <input
              type="email"
              placeholder="lima@gmail.com"
              className="border border-gray-500 bg-gray-800 text-white p-3 rounded w-full"
            />

            <div className="flex gap-2">
              <select className="border border-gray-500 bg-gray-800 text-white p-3 rounded">
                <option value="US">US</option>
                <option value="BD">BD</option>
                <option value="IN">IN</option>
              </select>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="border border-gray-500 bg-gray-800 text-white p-3 rounded w-full"
              />
            </div>

            <textarea
              placeholder="Leave us a message..."
              className="border border-gray-500 bg-gray-800 text-white p-3 rounded w-full"
              rows="4"
            ></textarea>

            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> Website design
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> Content creation
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> UX design
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> Strategy & consulting
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> User research
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> Other
              </label>
            </div>

            <button
              type="submit"
              className="bg-[#00ced1] text-white py-3 px-6 rounded hover:bg-blue-800"
            >
              Send message
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
         <div className="space-y-8 bg-black p-6 rounded-xl shadow-lg">
      {/* Chat Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-white">Chat with us</h2>
        <p className="text-gray-400 mb-3">
          Speak to our friendly team via live chat.
        </p>
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="flex items-center gap-3 text-white hover:text-[#00CED1] transition"
            >
              <span className="p-2 rounded-full bg-gray-800 text-[#00CED1]">
                <FiMessageCircle size={18} />
              </span>
              Start a live chat
            </a>
          </li>
          <li>
            <a
              href="mailto:example@email.com"
              className="flex items-center gap-3 text-white hover:text-[#00CED1] transition"
            >
              <span className="p-2 rounded-full bg-gray-800 text-[#00CED1]">
                <FaEnvelope size={18} />
              </span>
              Shoot us an email
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-3 text-white hover:text-[#00CED1] transition"
            >
              <span className="p-2 rounded-full bg-gray-800 text-[#00CED1]">
                <RiTwitterXLine size={18} />
              </span>
              Message us on X
            </a>
          </li>
        </ul>
      </div>

      {/* Call Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-white">Call us</h2>
        <p className="text-gray-400 mb-3">
          Call our team Mon–Fri from 8am to 5pm.
        </p>
        <p className="flex items-center gap-3 text-[#00CED1] font-medium">
          <span className="p-2 rounded-full bg-gray-800">
            <FaPhoneAlt size={16} />
          </span>
          +1 (555) 000-0000
        </p>
      </div>

      {/* Visit Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-white">Visit us</h2>
        <a
          href="https://maps.google.com"
          className="flex items-center gap-3 text-white hover:text-[#00CED1] transition"
        >
          <span className="p-2 rounded-full bg-gray-800 text-[#00CED1]">
            <FaMapMarkerAlt size={18} />
          </span>
          100 Smith Street, Collingwood VIC 3066
        </a>
      </div>
    </div>
      </div>
    </div>
  );
};

export default ContactPage;