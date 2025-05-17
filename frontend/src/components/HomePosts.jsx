import { useEffect, useState } from "react";
import { IF } from "../url";

const HomePosts = ({ post }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full px-4 mt-8">
      <div
        className={`relative flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-lg bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200 
        transform transition-all duration-700 ease-in-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        hover:shadow-2xl hover:scale-[1.015]`}
      >
        <div className="w-full md:w-[35%] h-[220px] md:h-auto overflow-hidden group">
          <img
            src={IF + post.photo}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        </div>

        <div className="w-full md:w-[65%] p-6 flex flex-col justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-snug hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h1>

          <div className="flex justify-between items-center text-sm text-gray-500 font-medium mb-4">
            <p className="text-blue-500">@{post.username}</p>
            <div className="text-right">
              <p>{new Date(post.updatedAt).toDateString()}</p>
              <p className="text-xs">
                {new Date(post.updatedAt).toTimeString().slice(0, 8)}
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            {post.desc.slice(0, 200)}{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">
              ...Read more
            </span>
          </p>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-70" />
      </div>
    </div>
  );
};

export default HomePosts;
