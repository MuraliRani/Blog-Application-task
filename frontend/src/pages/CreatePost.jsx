import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    if (cat.trim() !== "") {
      updatedCats.push(cat);
    }
    setCat("");
    setCats(updatedCats);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;

      try {
        await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-pink-200">
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8 ">
        <h1 className="font-bold md:text-2xl text-xl text-center">
          Create a post
        </h1>
        <form className="w-full md:w-[70%] mx-auto flex flex-col space-y-4 md:space-y-6 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter post title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter post category"
                type="text"
              />
              <div
                onClick={addCategory}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mt-2 md:mt-0 px-4 py-2 font-semibold cursor-pointer rounded-md hover:opacity-90 transition duration-200"
              >
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex flex-wrap px-1 mt-2">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-3 mb-2 bg-gray-200 px-3 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter post description"
          />
          <button
            onClick={handleCreate}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 w-full md:w-[40%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md hover:opacity-90 transition duration-200"
          >
            Create
          </button>
          <div className="h-12"></div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
