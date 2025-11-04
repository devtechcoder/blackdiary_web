import React from "react";
import { HomeOutlined, CameraOutlined, SearchOutlined, BellOutlined } from "@ant-design/icons";
import logo from "../../assets/images/icon/logo.png";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

function Header({ showDrawer, isMobile }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="bg-[#121212] text-white h-20 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center gap-4 flex-1">
        <img src={logo} alt="Logo" className="h-8 cursor-pointer" onClick={() => navigate("/")} />

        {!isMobile && (
          <>
            <div className="group">
              <HomeOutlined className="text-white text-2xl cursor-pointer group-hover:scale-110 transition-transform duration-200" onClick={() => navigate("/")} />
            </div>
            <div className="bg-[#242424] rounded-full px-4 py-[6px] flex items-center w-full max-w-md focus-within:ring-2 focus-within:ring-green-500 transition">
              <SearchOutlined className="text-[#aaa] mr-3 text-xl" />
              <input type="text" placeholder="What do you want to read?" className="bg-transparent outline-none text-white w-full placeholder:text-[#aaa]" />
              <CameraOutlined className="text-[#aaa] ml-3 text-xl cursor-pointer hover:text-white transition" onClick={() => navigate("/search/sub-category")} />
            </div>
          </>
        )}
      </div>
      {/* Right Side */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          // If user not logged in
          <>
            <button className="text-white hover:text-green-500 font-medium transition duration-200" onClick={() => navigate("/signUp-diary")}>
              Sign up
            </button>
            <button className="bg-white text-black font-semibold px-4 py-1 rounded-full hover:scale-105 transition-transform duration-200" onClick={() => navigate("/login-diary")}>
              Log in
            </button>
          </>
        ) : (
          // If user is logged in
          <>
            <button className="bg-white text-black font-semibold px-4 py-1 rounded-full hover:opacity-90 transition">Black Diary</button>
            <BellOutlined className="text-xl hover:scale-110 transition-transform duration-200" />

            <div className="bg-[#4b3b2a] w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold" onClick={() => navigate(`/profile/:username?/:id?`)}>
              S
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
