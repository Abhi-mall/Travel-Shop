import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import covervideo from "../assets/covervideo1.mp4";
import vector from "../assets/Vector.png";
import vector1 from "../assets/VectorOne.png";
import vector2 from "../assets/VectorTwo.png";
import Divider from "../components/Divider";
import Landing from "../components/Landing.jsx";
import Login from "../components/Login.jsx";
import RegistrationModal from "../components/Registration.jsx";

const HomePage = () => {
  const [modalType, setModalType] = useState("landing");

  // const openLogin = () => setModalType("login");
  // const openRegister = () => setModalType("register");
  // const closeModals = () => setModalType(null);
  return (
    <section>
      <div className="relative w-full h-[78vh] overflow-hidden">
        {/* Desktop/Tablet Video */}

        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={covervideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10" />

        {/* Centered Content */}
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-6 sm:px-10 max-w-2xl text-white">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Make Every Trip Memorable with
            <br /> Our Expert Travel Accessories
          </h1>
          <p className="text-base sm:text-lg mb-6">
            Discover high-quality, durable, and stylish travel gear designed to
            enhance your journey and keep you prepared wherever you go.
          </p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 sm:px-6 sm:py-3 rounded-full shadow-md">
            Start Shopping
          </button>
        </div>
      </div>

      <div className="w-full h-auto py-12 flex flex-col items-center dotted-background">
        <div className="w-full max-w-4xl px-4 sm:px-0 mb-8">
          <h1 className="text-[#EC1380] text-2xl sm:text-3xl font-bold text-center flex flex-col items-center sm:text-left">
            Explore Confidently with Our Gear
          </h1>
        </div>
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between md:px-4 gap-6 px-4 sm:px-0">
          {/* Card 1 */}
          <div className="w-full sm:w-[220px] group flex flex-col bg-white items-center justify-center cursor-pointer hover:bg-pink-600 py-6 px-4 shadow-lg rounded-2xl transition-all duration-200">
            <img
              src={vector}
              alt="vector"
              className="w-20 h-20 transition duration-200 group-hover:brightness-0 group-hover:invert"
            />
            <p className="w-full font-medium text-black group-hover:text-white mt-8 text-center transition duration-200">
              Ergonomic <span className="font-bold">Comfort</span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-full sm:w-[220px] group flex flex-col bg-white items-center justify-center cursor-pointer hover:bg-pink-600 py-6 px-4 shadow-lg rounded-2xl transition-all duration-200">
            <img
              src={vector1}
              alt="vector1"
              className="w-20 h-20 group-hover:brightness-0 group-hover:invert"
            />
            <p className="w-full font-medium text-black group-hover:text-white mt-8 text-center transition duration-200">
              Lightweight <span className="font-bold">Durability</span>
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-full sm:w-[220px] group flex flex-col bg-white items-center justify-center cursor-pointer hover:bg-pink-600 py-6 px-4 shadow-lg rounded-2xl transition-all duration-200">
            <img
              src={vector2}
              alt="vector2"
              className="w-20 h-20 transition duration-300 group-hover:brightness-0 group-hover:invert"
            />
            <p className="w-full font-medium text-black group-hover:text-white mt-8 text-center transition duration-300">
              Organized <span className="font-bold">Storage</span>
            </p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="w-full bg-white flex flex-col lg:flex-row items-center justify-center gap-10 px-4 sm:px-10 py-12">
        {/* Left Section */}
        <div className="w-full lg:w-[526px] h-auto flex flex-col items-center lg:items-start">
          <div className="h-auto w-full font-semibold text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-1">
              Your trusted partner for quality travel gear
            </h1>
            <h1 className="text-4xl sm:text-5xl font-bold text-pink-600 mb-10">
              worldwide
            </h1>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-8 py-3 rounded-full mt-8 sm:mt-40">
            See Collection
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[746px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-pink-100 p-6 rounded-xl shadow-md">
            <h2 className="text-pink-600 font-bold text-3xl mb-2">01</h2>
            <p className="text-black text-3xl">
              Reliable Gear Designed for Every Traveler’s Needs
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-pink-100 p-6 rounded-xl shadow-md">
            <h2 className="text-pink-600 font-bold text-3xl mb-2">02</h2>
            <p className="text-black text-3xl">
              <span className="font-bold text-pink-600">
                Global Shipping to Keep{" "}
              </span>{" "}
              You Ready Anywhere
            </p>
          </div>

          {/* Card 3 (full width) */}
          <div className="bg-pink-100 p-6 rounded-xl shadow-md md:col-span-2">
            <h2 className="text-pink-600 font-bold text-3xl mb-2">03</h2>
            <p className="text-black text-3xl">
              Committed to
              <span className="font-bold text-pink-600"> Quality</span> and
              Customer <br />
              Satisfaction
            </p>
          </div>
        </div>
      </div>

      <Divider />
      {/* Conditional Modals */}
      {modalType === "landing" && (
        <Landing
          close={() => setModalType(null)}
          openLogin={() => setModalType("login")}
          openRegister={() => setModalType("register")}
        />
      )}
      {modalType === "login" && (
        <Login
          close={() => setModalType(null)}
          openRegister={() => setModalType("register")}
        />
      )}
      {modalType === "register" && (
        <RegistrationModal
          close={() => setModalType(null)}
          openLogin={() => setModalType("login")}
        />
      )}
    </section>
  );
};

export default HomePage;
