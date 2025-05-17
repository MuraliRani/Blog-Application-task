import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      await axios.put(
        `${URL}/api/users/${user._id}`,
        { username, email, password },
        { withCredentials: true }
      );
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div className="bg-gradient-to-br from-pink-300 via-green-100 to-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col-reverse md:flex-row gap-10">
        <div className="w-full md:w-2/3">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Your posts:</h1>
          <div className="space-y-6">
            {posts?.map((p) => (
              <ProfilePosts key={p._id} p={p} />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 shadow-lg rounded-xl space-y-5">
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none px-4 py-2 w-full text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none px-4 py-2 w-full text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-300"
              placeholder="Your email"
              type="email"
            />
            <div className="flex justify-between pt-2">
              <button
                onClick={handleUserUpdate}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md transition-all"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-md transition-all"
              >
                Delete
              </button>
            </div>
            {updated && (
              <p className="text-green-600 text-sm text-center">
                User updated successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
