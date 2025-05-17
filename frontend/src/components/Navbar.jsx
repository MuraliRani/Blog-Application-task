import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const showMenu = () => {
    setMenu(!menu);
  };
  const { user } = useContext(UserContext);

  return (
    <div
      className="flex items-center justify-between px-6 md:px-[200px] py-4 
        bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 
        shadow-md transition-all duration-500 ease-in-out"
    >
      <h1 className="text-3xl md:text-3xl font-extrabold text-black transition-transform duration-300 hover:scale-105">
        <Link to="/">Blog Application</Link>
      </h1>

      {path === "/" && (
        <div className="flex justify-center items-center space-x-2 transition-all duration-300">
          <p
            onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
            className="cursor-pointer text-white text-2xl p-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
            title="Search"
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 py-2 rounded-md text-lg md:text-xl text-black transition duration-300 focus:ring-2 focus:ring-purple-500"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-4 text-white text-xl">
        {user ? (
          <h3 className="hover:text-gray-300 transition-colors duration-300">
            <Link to="/write">Create Blog</Link>
          </h3>
        ) : (
          <h3 className="hover:text-gray-300 transition-colors duration-300">
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div
            onClick={showMenu}
            className="cursor-pointer p-2 rounded-md hover:bg-gray-800 transition-all duration-300"
          >
            <FaBars className="text-2xl" />
            {menu && <Menu />}
          </div>
        ) : (
          <h3 className="hover:text-gray-300 transition-colors duration-300">
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>

      <div
        onClick={showMenu}
        className="md:hidden text-white text-2xl cursor-pointer p-2 rounded-md hover:bg-gray-800 transition-all duration-300"
      >
        <FaBars />
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
