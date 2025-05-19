import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";

const RegistrationModal = ({ close, openLogin }) => {
  const [data, setData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!data.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!data.contactNumber.trim()) {
      toast.error("Contact number is required");
      return false;
    }
    if (!data.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!data.password) {
      toast.error("Password is required");
      return false;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password must match");
      return false;
    }
    if (!data.category) {
      toast.error("Please select a category");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          contactNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          category: "",
        });
        close();
        if (openLogin) openLogin();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    close();
    if (openLogin) openLogin();
  };

  return (
    <section className="fixed inset-0 bg-neutral-900 bg-opacity-70 p-4 z-50 flex justify-center items-center overflow-auto">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl mt-64 md:mt-28">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
          aria-label="Close registration modal"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-3">
          Welcome to Travel Shop
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Let’s get started with your curation journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={data.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
                disabled={loading}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-semibold mb-1"
              >
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                value={data.contactNumber}
                onChange={handleChange}
                placeholder="Your contact number"
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email Id
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email ID"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold mb-1"
            >
              Which category do you choose?
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
              disabled={loading}
            >
              <option value="">Select</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Accommodation">Accommodation</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-full text-white ${
              loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Login switch link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className="text-pink-600 hover:underline font-semibold"
          >
            Login
          </button>
        </p>

        <p className="text-center text-sm text-gray-500 mt-3">
          By registering, you agree to our{" "}
          <a
            href="/terms"
            className="underline hover:text-pink-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline hover:text-pink-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default RegistrationModal;
