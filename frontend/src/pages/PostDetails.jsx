import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
      console.log("Fetched post:", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoader(false);
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${URL}/api/comments/create`,
        {
          comment,
          author: user.username,
          postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostComments();
  }, [postId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-blue-100">
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-6 md:px-32 py-10">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800">
              {post.title}
            </h1>
            {user?._id === post?.userId && (
              <div className="flex space-x-4 text-xl text-gray-700">
                <BiEdit
                  onClick={() => navigate(`/edit/${postId}`)}
                  className="cursor-pointer hover:text-blue-600 transition"
                />
                <MdDelete
                  onClick={handleDeletePost}
                  className="cursor-pointer hover:text-red-600 transition"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between text-gray-500 text-sm mb-4">
            <p>@{post.username}</p>
            <p>
              {new Date(post.updatedAt).toLocaleDateString()} —{" "}
              {new Date(post.updatedAt).toLocaleTimeString()}
            </p>
          </div>

          {post.photo && (
            <img
              src={IF + post.photo}
              className="w-full max-w-3xl max-h-[500px] mx-auto rounded-xl object-cover shadow-md my-6"
              alt="Post"
            />
          )}

          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
            {post.desc}
          </p>

          <div className="mt-8">
            <h4 className="font-semibold text-gray-700 mb-2">Categories:</h4>
            {post.categories?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((c, i) => (
                  <div
                    key={i}
                    className="bg-blue-200 text-blue-900 rounded-full px-4 py-1 text-sm"
                  >
                    {c}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No categories assigned.
              </p>
            )}
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Comments:</h3>
            <div className="space-y-4">
              {comments?.map((c) => (
                <Comment key={c._id} c={c} post={post} />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              placeholder="Write a comment..."
              className="flex-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 py-3 px-4 outline-none transition"
            />
            <button
              onClick={postComment}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition md:w-40"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
