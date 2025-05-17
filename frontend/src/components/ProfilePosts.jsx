import { IF } from "../url";
const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full mt-8">
      <div
        className="flex flex-col md:flex-row bg-gray-300 rounded-xl shadow-md overflow-hidden 
        hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
      >
        <div className="md:w-[35%] w-full h-[200px] md:h-auto flex justify-center items-center">
          <img
            src={IF + p.photo}
            alt="post"
            className="h-full w-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none 
            transition-transform duration-500 ease-in-out hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between p-4 md:w-[65%] space-y-3">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 transition-colors duration-300 hover:text-purple-700">
            {p.title}
          </h1>

          <div className="flex justify-between text-sm font-semibold text-gray-600">
            <p className="transition-opacity duration-300 hover:opacity-80">
              @{p.username}
            </p>
            <div className="flex space-x-2">
              <p>{new Date(p.updatedAt).toDateString()}</p>
              <p>
                {new Date(p.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-sm md:text-base transition-all duration-300">
            {p.desc.slice(0, 200)}{" "}
            <span className="text-green-700 font-medium hover:underline cursor-pointer transition duration-300">
              ...Read more
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
