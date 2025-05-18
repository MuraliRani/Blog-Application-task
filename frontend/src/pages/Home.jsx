import axios from "axios";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import { IF, URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    setError(null);
    try {
      // Log the URL being called
      console.log("Fetching from:", URL + "/api/posts" + (search ? search : ""));
      
      const res = await axios.get(URL + "/api/posts" + (search ? search : ""), {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Response:", res.data);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.message || "Failed to fetch posts");
      setLoader(false);
      setNoResults(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh] bg-gradient-to-br from-white via-pink-100 to-pink-100">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-center mt-16">
            <h3 className="text-red-500 font-bold mb-2">Error loading posts</h3>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={fetchPosts}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        ) : !noResults ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
    </>
  );
};

export default Home;
