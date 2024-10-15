import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../Auth/logOut";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logOutUser(dispatch, navigate, token);
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between items-center p-4">
        <div className="w-10  drop-shadow-md flex space-x-2 ">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/024/553/676/small_2x/skull-wearing-crown-logo-skull-king-sticker-pastel-cute-colors-generative-ai-png.png"
            alt=""
          />
          <span className="pt-2 font-bold text-xl">Notes</span>
        </div>
        {!isAuthenticated && (
          <Link
            to="signIn"
            className="bg-[#08090A] no-underline text-white px-4 py-2 rounded-lg"
          >
            SignIn
          </Link>
        )}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-[#08090A] no-underline text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
