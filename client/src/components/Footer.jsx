import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-white px-10 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between  items-start ">
        {/* Left Column */}
        <div>
          <h2 className="text-black font-bold text-lg">TRAVEL SHOP</h2>
        </div>

        {/* Right Columns */}
        <div className="flex flex-col sm:flex-row gap-32">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 text-black text-lg">
            <span className="cursor-pointer">About</span>
            <span className="cursor-pointer">Support</span>
            <span className="cursor-pointer">Contact</span>
            <span className="cursor-pointer">Careers</span>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 text-black text-lg">
            <span className="cursor-pointer">Privacy</span>
            <span className="cursor-pointer">Shipping</span>
            <span className="cursor-pointer">Returns</span>
            <span className="cursor-pointer">Blog</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
