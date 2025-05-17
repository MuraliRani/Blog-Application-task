import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const deleteComment = async (id) => {
    try {
      await axios.delete(URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`px-4 py-3 bg-gray-100 rounded-xl shadow-sm my-3 transform transition-all duration-700 ease-in-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        hover:shadow-md`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-gray-700">@{c.author}</h3>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <p>{new Date(c.updatedAt).toDateString()}</p>
          <p>{new Date(c.updatedAt).toTimeString().slice(0, 8)}</p>

          {/* Delete Icon */}
          {user?._id === c?.userId && (
            <button
              className="text-red-500 hover:text-red-600 transition-colors duration-300"
              onClick={() => deleteComment(c._id)}
              title="Delete Comment"
            >
              <MdDelete className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Comment Text */}
      <p className="text-gray-700 mt-2 transition-opacity duration-500">
        {c.comment}
      </p>
    </div>
  );
};

export default Comment;
