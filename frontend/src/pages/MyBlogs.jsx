import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import HomePosts from "../components/HomePosts";
import Loader from "../components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div className="bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#dfe9f3] min-h-screen animate-fade-in">
      <Navbar />
      <div className="px-6 md:px-32 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center transition duration-500 hover:text-purple-600">
          My Blogs
        </h1>

        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <Link
                to={user ? `/posts/post/${post._id}` : "/login"}
                key={post._id}
                className="transform transition duration-300 hover:scale-[1.01]"
              >
                <div className="bg-pink-100 shadow-md rounded-2xl hover:shadow-xl transition-all duration-500 pb-5 pt-1 animate-slide-up">
                  <HomePosts post={post} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="text-center text-xl font-semibold mt-20 text-gray-700 animate-fade-in">
            No posts available
          </h3>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
