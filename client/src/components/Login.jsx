import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails";

const Login = ({ close, openRegister }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({ ...SummaryApi.login, data });

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        setData({ email: "", password: "" });
        close();
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 bg-neutral-900 bg-opacity-70 p-4 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-xl">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
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
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email Id
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email ID"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
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
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-full"
          >
            Login
          </button>
        </form>

        <hr className="my-6 border-dashed" />

        <p className="text-center text-sm">
          Don't have credentials?{" "}
          <button
            onClick={() => {
              close();
              openRegister();
            }}
            className="text-pink-600 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </section>
  );
};

export default Login;
