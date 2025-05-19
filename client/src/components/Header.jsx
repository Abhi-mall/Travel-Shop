import React, { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import SearchComponent from "./Search"; // Renamed for clarity
import { useSelector } from "react-redux";
import Login from "./Login";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from "./UserMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setUserMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [mobileUserMenu, setMobileUserMenu] = useState(false);
  // console.log(user);
  const handleCloseUserMenu = () => {
    setUserMenu(false);
  };

  const redirectToLoginPage = () => {
    setLogin(true);
  };
  return (
    <header className="bg-[#E2E8F0] px-4 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-black hidden md:block  ">
          TRAVEL SHOP
        </div>
        {/* Left: Logo */}
        <div className=" items-center gap-1 block md:hidden flex">
          <span className="text-2xl font-normal text-gray-900">deed-</span>
          {/* <div className="h-5 w-5 rounded-full border-2 border-dotted border-gray-400 animate-spin-slow" /> */}
          <div className="h-5 w-5 rounded-full animate-spin-slow bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500" />
        </div>

        {/* Icons  */}
        <div className="flex items-center gap-4 md:hidden">
          <Search size={20} className="text-gray-700" />
          <button>
            <User
              onClick={() => setMobileUserMenu((prev) => !prev)}
              size={20}
              className="text-gray-700 "
            />
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop/Tablet Menu */}
        <div className="hidden md:flex items-center gap-6 w-fit ml-2 ">
          <nav className="flex gap-32 text-gray-700 font-medium justify-between items-center">
            <div className=" flex gap-6">
              <a href="#" className="hover:text-pink-600 font-bold">
                Buy
              </a>
              <a href="#" className="hover:text-pink-600 font-bold">
                Curate
              </a>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <SearchComponent />
              </div>

              <div className=" lg:flex  items-center gap-10 ">
                {user?._id ? (
                  <div className="relative">
                    <div
                      onClick={() => setUserMenu((prev) => !prev)}
                      className="flex gap-1 items-center cursor-pointer select-none"
                    >
                      <p>Account</p>

                      {openUserMenu ? (
                        <GoTriangleUp size={25} />
                      ) : (
                        <GoTriangleDown size={25} />
                      )}
                    </div>
                    {openUserMenu && (
                      <div className="absolute top-12 z-40 right-0">
                        <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                          <UserMenu close={handleCloseUserMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  ""
                  //   (
                  //   <button
                  //     onClick={redirectToLoginPage}
                  //     className="font-bold hover:text-pink-600 px-2"
                  //   >
                  //     Login
                  //   </button>
                  // )
                )}
              </div>

              <a href="#" className="hover:text-pink-600 font-bold">
                Contact
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden flex flex-col items-start gap-4 px-2">
          <a href="#" className="text-gray-700 font-bold hover:text-pink-600">
            Buy
          </a>
          <a href="#" className="text-gray-700 font-bold hover:text-pink-600">
            Curate
          </a>
          <a href="#" className="text-gray-700 font-bold hover:text-pink-600">
            Contact
          </a>
        </div>
      )}
      {login && (
        <Login
          close={() => {
            setLogin(false);
          }}
        />
      )}
      {mobileUserMenu && window.innerWidth < 768 && (
        <div className="absolute top-12 z-40 right-0">
          <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
            <UserMenu close={handleCloseUserMenu} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
