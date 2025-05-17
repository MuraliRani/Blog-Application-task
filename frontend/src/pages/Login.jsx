import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-300 to-blue-200 flex flex-col">
      <div className="flex items-center justify-between px-6 md:px-32 py-4 bg-transparent">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-800">
          <Link to="/">Blog Application</Link>
        </h1>
        <h3 className="text-gray-700 hover:text-black transition">
          <Link to="/register">Register</Link>
        </h3>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div
          className="bg-black shadow-2xl rounded-2xl p-10 w-[90%] md:w-[30%] space-y-8
                     transform transition-transform duration-500 ease-in-out
                     hover:scale-105 hover:shadow-pink-600/60
                     hover:rotate-1"
        >
          <h1
            className="text-3xl font-extrabold text-white text-center mb-6
                       transition-transform duration-500 ease-in-out
                       hover:rotate-2"
          >
            Login
          </h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Log in
          </button>

          {error && (
            <p className="text-red-500 text-center text-sm">
              Something went wrong. Please try again.
            </p>
          )}

          <div className="flex justify-center items-center space-x-2 text-sm text-gray-600">
            <p>New here?</p>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
