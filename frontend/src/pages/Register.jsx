import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setError(false);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-300 to-blue-200 flex flex-col">
      <div className="flex items-center justify-between px-6 md:px-32 py-4 text-black">
        <h1
          className="text-xl md:text-2xl font-extrabold tracking-wide
                       transition-transform duration-500 ease-in-out
                       hover:rotate-1 hover:scale-105"
        >
          <Link to="/">Blog Application</Link>
        </h1>
        <h3 className="hover:text-black transition-colors duration-200 ease-in-out hover:rotate-1 hover:scale-105">
          <Link to="/login">Login</Link>
        </h3>
      </div>

      <div className="flex-grow flex justify-center items-center px-4">
        <div
          className="bg-black shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6
                     transform transition-transform duration-500 ease-in-out
                     hover:scale-105 hover:rotate-1 hover:shadow-pink-600/50"
        >
          <h1
            className="text-2xl font-bold text-center text-white
                       transition-transform duration-500 ease-in-out
                       hover:rotate-2"
          >
            Create an account
          </h1>

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition"
            type="text"
            placeholder="Enter your username"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition"
            type="text"
            placeholder="Enter your email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition"
            type="password"
            placeholder="Enter your password"
          />

          <button
            onClick={handleRegister}
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-gray-900 transition-all duration-200"
          >
            Register
          </button>

          {error && (
            <p className="text-red-500 text-center text-sm">
              Something went wrong. Please try again.
            </p>
          )}

          <div
            className="flex justify-center items-center space-x-2 text-sm text-gray-600
                          transition-transform duration-500 ease-in-out hover:rotate-1 hover:scale-105"
          >
            <p>Already have an account?</p>
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
