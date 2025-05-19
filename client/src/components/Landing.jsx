import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Layer_1 from "../assets/Layer_1.png";
import RegistrationModal from "./Registration";

const Landing = ({ close, openRegister }) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <section className="fixed inset-0 bg-neutral-900 bg-opacity-70 p-4 z-50 flex justify-center items-center">
      <div className="w-full max-w-md max-h-[60vh] p-6 rounded-2xl bg-white relative flex flex-col items-center">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        <img
          src={Layer_1}
          alt="Landing"
          className="w-20 h-20 object-contain mb-4 cursor-pointer"
          onClick={close}
        />

        <h1 className="font-semibold text-center mb-4">
          Welcome back! Register to start your travel journey
        </h1>

        <button
          onClick={() => {
            close(); // Make sure Landing closes
            openRegister(); // Then Register opens
          }}
          className="text-[#EC1380] font-semibold hover:underline"
        >
          Register Here
        </button>
      </div>

      {showRegister && (
        <RegistrationModal close={() => setShowRegister(false)} />
      )}
    </section>
  );
};

export default Landing;
