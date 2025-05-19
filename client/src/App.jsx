import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch } from "react-redux";
import fetchUserDetails from "./utils/fetchUserDetails.js";
import { setUserDetails } from "./store/userSlice.js";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
